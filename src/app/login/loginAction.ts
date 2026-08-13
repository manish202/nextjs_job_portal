"use server";
import { z } from "zod";
import { eq } from 'drizzle-orm';
import {loginSchema} from "@/zod_schema/authSchema";
import getIpAddress from "@/lib/getIpAddress";
import db from "@/config/db";
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";
import sessionsTableSchema from "@/drizzle/table_schema/sessionsTableSchema";
import argon2 from "argon2";
import { headers, cookies } from "next/headers";
import crypto from "crypto";

type RegistrationFormData = z.infer<typeof loginSchema>;

const createSessionAndSetCookie = async (userId: number) => {
    const hexId = crypto.randomBytes(32).toString("hex").normalize();
    const sessionId = crypto.createHash('sha-256').update(hexId).digest("hex");
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || "";
    const ip = await getIpAddress();
    const SESSION_LIFETIME = 30*24*60*60;
    const expiresAt = new Date(Date.now() + (SESSION_LIFETIME * 1000));
    const [result] = await db.insert(sessionsTableSchema).values({sessionId,userId,userAgent,ip,expiresAt});
    const cookieStore = await cookies();
    cookieStore.set('session_id',sessionId,{
        secure: true,
        httpOnly: true,
        maxAge: SESSION_LIFETIME
    });
}

const loginAction = async (data: RegistrationFormData) => {
    try{
        const {email,password} = data;
        const [existingUser] = await db.select().from(usersTableSchema).where(eq(usersTableSchema.email, email));
        if(!existingUser) return {status: false, message: "Invalid login credentials"};
        const isMatched = await argon2.verify(existingUser.password,password);
        if(!isMatched) return {status: false, message: "Invalid login credentials"};
        await createSessionAndSetCookie(existingUser.id);
        return {status: true, message: "Login successful"};
    }catch(error:any){
        console.log(error.message);
        return {status: false, message: "Login failed due to some reasons."};
    }
}

export default loginAction;