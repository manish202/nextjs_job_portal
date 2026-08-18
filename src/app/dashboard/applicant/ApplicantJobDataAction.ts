'use server';

import { getCurrentUser } from "@/features/auth/sessions";
import jobsTableSchema from "@/drizzle/table_schema/jobsTableSchema";
import employersTableSchema from "@/drizzle/table_schema/employersTableSchema";
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";
import { SALARY_CURRENCY, SALARY_PERIOD, WORK_TYPE, } from "@/drizzle/table_schema/jobsTableSchema";
import { and, or, eq, gte, isNull, desc } from 'drizzle-orm';
import db from "@/config/db";

type SalaryCurrency = typeof SALARY_CURRENCY[number];
type SalaryPeriod = typeof SALARY_PERIOD[number];
type WorkType = typeof WORK_TYPE[number];

export interface ApplicantJob{
    id: number;
    title: string;
    description: string;
    minSalary: number | null;
    maxSalary: number | null;
    salaryCurrency: SalaryCurrency | null;
    salaryPeriod: SalaryPeriod | null;
    location: string | null;
    workType: WorkType | null;
    createdAt: Date;
    companyName: string | null;
}

export type GetAllJobDataResponse = { status: true, data: ApplicantJob[] } | { status: false, message: string };

export const getAllJobDataAction = async (): Promise<GetAllJobDataResponse> => {
    try{
        const today = new Date();
        today.setHours(0,0,0,0);
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'applicant') return {status: false,message: "forbidden"};
        const data: ApplicantJob[] = await db.select({
            id: jobsTableSchema.id,
            title: jobsTableSchema.title,
            description: jobsTableSchema.description,
            minSalary: jobsTableSchema.minSalary,
            maxSalary: jobsTableSchema.maxSalary,
            salaryCurrency: jobsTableSchema.salaryCurrency,
            salaryPeriod: jobsTableSchema.salaryPeriod,
            location: jobsTableSchema.location,
            workType: jobsTableSchema.workType,
            createdAt: jobsTableSchema.createdAt,
            companyName: employersTableSchema.company_name,
        }).from(jobsTableSchema)
        .innerJoin(employersTableSchema,eq(jobsTableSchema.employerId,employersTableSchema.id))
        .innerJoin(usersTableSchema,eq(employersTableSchema.id,usersTableSchema.id))
        .where(and(
            isNull(jobsTableSchema.deletedAt),
            or(
                isNull(jobsTableSchema.expiresAt),
                gte(jobsTableSchema.expiresAt,today)
            )
        )).orderBy(desc(jobsTableSchema.createdAt));
        return {status: true, data};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

// agar tum getAllJobDataAction function k andar se data return kar rahe hote to ye shortcut use kar pate.
// type ApplicantJob = Awaited<ReturnType<typeof getAllJobDataAction>>[number];