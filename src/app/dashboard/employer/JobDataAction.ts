'use server';

import { getCurrentUser } from "@/features/auth/sessions";
import jobsTableSchema from "@/drizzle/table_schema/jobsTableSchema";
import { and, eq } from 'drizzle-orm';
import db from "@/config/db";
import { type JobPostInsertFormData, type JobPostUpdateFormData } from "@/zod_schema/jobSchema";

export const insertJobDataAction = async (data:JobPostInsertFormData) => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'employer') return {status: false,message: "forbidden"};
        const { id, ...insertData } = data;
        await db.insert(jobsTableSchema).values({...insertData,employerId: user.id,});
        return {status: true, message: "Data inserted successfully"};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

export const updateJobDataAction = async (data:JobPostUpdateFormData) => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'employer') return {status: false,message: "forbidden"};
        const { id, ...updateData } = data;
        if(typeof id !== "number") return {status: false,message: "invalid id"};
        await db.update(jobsTableSchema).set({...updateData,employerId: user.id,})
        .where(and(
            eq(jobsTableSchema.id,id),
            eq(jobsTableSchema.employerId,user.id),
        ));
        return {status: true, message: "Data updated successfully"};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}