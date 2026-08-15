"use server";
import { z } from "zod";
import { eq } from 'drizzle-orm';
import {registrationSchema} from "@/zod_schema/authSchema";
import db from "@/config/db";
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";
import applicantsTableSchema from "@/drizzle/table_schema/applicantsTableSchema";
import employersTableSchema from "@/drizzle/table_schema/employersTableSchema";
import argon2 from "argon2";

type RegistrationFormData = z.infer<typeof registrationSchema>;

const registrationAction = async (data: RegistrationFormData) => {
    try{
        const {name,userName,email,password,role} = data;
        const [existingUser] = await db.select().from(usersTableSchema).where(eq(usersTableSchema.email, email));
        if(existingUser) return {status: false, message: "Email already exists"};
        const hashedPassword = await argon2.hash(password);
        await db.transaction(async (tx) => {
            const [result] = await tx.insert(usersTableSchema).values({name,userName,email,password:hashedPassword,role});
            if(role === 'applicant') await tx.insert(applicantsTableSchema).values({id:result.insertId});
            if(role === 'employer') await tx.insert(employersTableSchema).values({id:result.insertId});
        });
        return {status: true, message: "Registration successful"};
    }catch(error:any){
        console.log(error.message);
        return {status: false, message: "Registration failed due to some reasons."};
    }
}

export default registrationAction;