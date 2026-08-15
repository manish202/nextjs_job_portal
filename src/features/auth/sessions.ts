import {cache} from "react";
import { eq } from 'drizzle-orm';
import getIpAddress from "@/lib/getIpAddress";
import db from "@/config/db";
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";
import sessionsTableSchema from "@/drizzle/table_schema/sessionsTableSchema";
import { headers, cookies } from "next/headers";
import crypto from "crypto";

const SESSION_LIFETIME = 30*24*60*60;

const getHashId = (rawHexId: string) => crypto.createHash('sha-256').update(rawHexId).digest("hex");

export const createSessionAndSetCookie = async (userId: number) => {
    const hexId = crypto.randomBytes(32).toString("hex").normalize();
    const sessionId = getHashId(hexId);
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || "";
    const ip = await getIpAddress();
    const expiresAt = new Date(Date.now() + (SESSION_LIFETIME * 1000));
    const [result] = await db.insert(sessionsTableSchema).values({sessionId,userId,userAgent,ip,expiresAt});
    const cookieStore = await cookies();
    cookieStore.set('session_id',hexId,{
        secure: true,
        httpOnly: true,
        maxAge: SESSION_LIFETIME
    });
}

export const deleteSessionAndSetCookie = async (session_id: string, userId: number, logoutType: 'current_device' | 'all_device') => {
    const [p1,p2] = logoutType === 'current_device' ? [sessionsTableSchema.sessionId,session_id] : [sessionsTableSchema.userId,userId];
    await db.delete(sessionsTableSchema).where(eq(p1,p2));
    const cookieStore = await cookies();
    cookieStore.delete('session_id');
}

const updateSessionAndSetCookie = async (rawHexId: string,session_id: string) => {
    await db.update(sessionsTableSchema).set({
        expiresAt: new Date(Date.now() + (SESSION_LIFETIME * 1000))
    }).where(eq(sessionsTableSchema.sessionId,session_id));
    const cookieStore = await cookies();
    cookieStore.set('session_id',rawHexId,{
        secure: true,
        httpOnly: true,
        maxAge: SESSION_LIFETIME
    });
}

export const getCurrentUser = cache(async () => {
    try{
        const cookieStore = await cookies();
        const rawHexId = cookieStore.get('session_id')?.value;
        if(!rawHexId) return {status: false, message: "User is not logged in."};
        const session_id = getHashId(rawHexId);
        const [user] = await db.select({
            id: usersTableSchema.id,
            session: {
                session_id: sessionsTableSchema.sessionId,
                expiresAt: sessionsTableSchema.expiresAt,
                userAgent: sessionsTableSchema.userAgent,
                ip: sessionsTableSchema.ip,
            },
            name: usersTableSchema.name,
            userName: usersTableSchema.userName,
            role: usersTableSchema.role,
            phoneNumber: usersTableSchema.phoneNumber,
            email: usersTableSchema.email,
            createdAt: usersTableSchema.createdAt,
            updatedAt: usersTableSchema.updatedAt,
        }).from(sessionsTableSchema).where(eq(sessionsTableSchema.sessionId,session_id))
        .innerJoin(usersTableSchema,eq(sessionsTableSchema.userId,usersTableSchema.id));
        if(!user) return {status: false, message: "Session or User does not exists."};
        const isExpired = user.session.expiresAt.getTime() <= Date.now();
        if(isExpired){
            // if session is expired then remove it from database.
            await deleteSessionAndSetCookie(session_id,user.id,'current_device');
            return {status: false, message: "Session is expired, please login again."};
        }
        // agar user session expire hone mai 20 din ya us se kam tim baki ho to session ko refresh karo.
        if(user.session.expiresAt.getTime() - Date.now() <= 20*24*60*60*1000){
            await updateSessionAndSetCookie(rawHexId,session_id);
        }
        return {status: true, user};
    }catch(error:any){
        return {status: false, message: error.message};
    }
});