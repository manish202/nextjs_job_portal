'use server';

import { z } from "zod";
import { employerSchema } from "@/zod_schema/employerSchema";
import { getCurrentUser } from "@/features/auth/sessions";
import { eq } from 'drizzle-orm';
import db from "@/config/db";
import employersTableSchema from "@/drizzle/table_schema/employersTableSchema";
import applicantsTableSchema from "@/drizzle/table_schema/applicantsTableSchema";
import {type UserDetails} from "@/zod_schema/applicantSchema";

type EmployerFormData = z.infer<typeof employerSchema>;

const updateUserDataAction = async (data: EmployerFormData | UserDetails) => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        const [table,id] = user?.role === 'employer' ? [employersTableSchema,employersTableSchema.id] : [applicantsTableSchema,applicantsTableSchema.id];
        await db.update(table).set(data).where(eq(id,user?.id!));
        return {status: true, message: "Data updated successfully"};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

export default updateUserDataAction;