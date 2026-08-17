'use server';

import { getCurrentUser } from "@/features/auth/sessions";
import jobsTableSchema, { type Job } from "@/drizzle/table_schema/jobsTableSchema";
import { and, eq } from 'drizzle-orm';
import db from "@/config/db";
import { type JobPostInsertFormData, type JobPostUpdateFormData } from "@/zod_schema/jobSchema";

export type GetJobDataResponse = { status: true, data: Job[] } | { status: false, message: string };

export const getJobDataAction = async (): Promise<GetJobDataResponse> => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'employer') return {status: false,message: "forbidden"};
        const data: Job[] = await db.select().from(jobsTableSchema)
        .where(eq(jobsTableSchema.employerId,user?.id!));
        return {status: true, data};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

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

export type DeleteJobDataAction = {status:boolean,message:string};

export const deleteJobDataAction = async (jobId:number):Promise<DeleteJobDataAction> => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'employer') return {status: false,message: "forbidden"};
        await db.delete(jobsTableSchema)
        .where(and(
            eq(jobsTableSchema.id,jobId),
            eq(jobsTableSchema.employerId,user.id),
        ));
        return {status: true, message: "Data deleted successfully"};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}