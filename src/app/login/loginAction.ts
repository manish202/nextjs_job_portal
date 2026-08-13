"use server";
import { z } from "zod";
import { eq } from 'drizzle-orm';
import {loginSchema} from "@/zod_schema/authSchema";
import db from "@/config/db";
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";
import argon2 from "argon2";
import { createSessionAndSetCookie } from "@/features/auth/sessions";

type RegistrationFormData = z.infer<typeof loginSchema>;

const loginAction = async (data: RegistrationFormData) => {
    try{
        const {email,password} = data;
        const [user] = await db.select().from(usersTableSchema).where(eq(usersTableSchema.email, email));
        if(!user) return {status: false, message: "Invalid login credentials"};
        const isMatched = await argon2.verify(user.password,password);
        if(!isMatched) return {status: false, message: "Invalid login credentials"};
        await createSessionAndSetCookie(user.id);
        return {status: true, message: "Login successful", role: user.role};
    }catch(error:any){
        console.log(error.message);
        return {status: false, message: "Login failed due to some reasons."};
    }
}

export default loginAction;