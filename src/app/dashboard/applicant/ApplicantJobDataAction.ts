'use server';

import { getCurrentUser } from "@/features/auth/sessions";
import jobsTableSchema from "@/drizzle/table_schema/jobsTableSchema";
import employersTableSchema from "@/drizzle/table_schema/employersTableSchema";
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";
import { SALARY_CURRENCY, SALARY_PERIOD, WORK_TYPE, JOB_TYPE, JOB_LEVEL, MIN_EDUCATION } from "@/drizzle/table_schema/jobsTableSchema";
import { and, or, eq, gte, isNull, desc, like } from 'drizzle-orm';
import db from "@/config/db";
// import { type DefaultValues } from "@/components/dashboard/ApplicantJobCardContainer";
import { type JobApplicationData } from "@/zod_schema/applicationsSchema";
import resumesTableSchema from "@/drizzle/table_schema/resumesTableSchema";
import applicationsTableSchema from "@/drizzle/table_schema/applicationsTableSchema";
import { currencySymbols } from "@/drizzle/table_schema/jobsTableSchema";
import { APPLICATION_STATUS } from "@/drizzle/table_schema/applicationsTableSchema";

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

export const getAllJobDataAction = async (filterData:any): Promise<GetAllJobDataResponse> => {
    try{
        const today = new Date();
        today.setHours(0,0,0,0);
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'applicant') return {status: false,message: "forbidden"};
        const conditions = [
            isNull(jobsTableSchema.deletedAt),
            or(
                isNull(jobsTableSchema.expiresAt),
                gte(jobsTableSchema.expiresAt,today)
            )
        ];
        if(filterData.search !== ""){
            conditions.push(like(jobsTableSchema.title, `%${filterData.search}%`));
        }
        if(JOB_TYPE.includes(filterData.jobType)){
            conditions.push(eq(jobsTableSchema.jobType, filterData.jobType));
        }
        if(WORK_TYPE.includes(filterData.workType)){
            conditions.push(eq(jobsTableSchema.workType, filterData.workType));
        }
        if(JOB_LEVEL.includes(filterData.jobLevel)){
            conditions.push(eq(jobsTableSchema.jobLevel, filterData.jobLevel));
        }
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
        .where(and(...conditions)).orderBy(desc(jobsTableSchema.createdAt));
        return {status: true, data};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

// agar tum getAllJobDataAction function k andar se data return kar rahe hote to ye shortcut use kar pate.
// type ApplicantJob = Awaited<ReturnType<typeof getAllJobDataAction>>[number];

type JobType = typeof JOB_TYPE[number];
type JobLevel = typeof JOB_LEVEL[number];
type MinEducation = typeof MIN_EDUCATION[number];

export interface SingleApplicantJob extends ApplicantJob{
    jobType: JobType | null;
    jobLevel: JobLevel | null;
    minEducation: MinEducation | null;
    experience: string | null;
    tags: string | null;
    avatarUrl: string | null;
    bannerImageUrl: string | null;
    organizationType: string | null;
    employerDesc: string | null;
    employerLocation: string | null;
    teamSize: string | null;
    yearOfEstablishment: number | null;
    websiteUrl: string | null;
    employerId: number;
}

export type GetSingleJobDetailsResponse = { status: true, data: SingleApplicantJob } | { status: false, message: string };

export const getSingleJobDetailsAction = async (job_id:number): Promise<GetSingleJobDetailsResponse> => {
    try{
        const today = new Date();
        today.setHours(0,0,0,0);
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'applicant') return {status: false,message: "forbidden"};
        const data: SingleApplicantJob[] = await db.select({
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
            jobType: jobsTableSchema.jobType,
            jobLevel: jobsTableSchema.jobLevel,
            minEducation: jobsTableSchema.minEducation,
            experience: jobsTableSchema.experience,
            tags: jobsTableSchema.tags,
            avatarUrl: employersTableSchema.avatarUrl,
            bannerImageUrl: employersTableSchema.bannerImageUrl,
            organizationType: employersTableSchema.organizationType,
            employerDesc: employersTableSchema.description,
            employerLocation: employersTableSchema.location,
            teamSize: employersTableSchema.teamSize,
            yearOfEstablishment: employersTableSchema.yearOfEstablishment,
            websiteUrl: employersTableSchema.websiteUrl,
            employerId: employersTableSchema.id,
        }).from(jobsTableSchema)
        .innerJoin(employersTableSchema,eq(jobsTableSchema.employerId,employersTableSchema.id))
        .innerJoin(usersTableSchema,eq(employersTableSchema.id,usersTableSchema.id))
        .where(and(
            eq(jobsTableSchema.id,job_id),
            isNull(jobsTableSchema.deletedAt),
            or(
                isNull(jobsTableSchema.expiresAt),
                gte(jobsTableSchema.expiresAt,today)
            )
        ));
        return {status: true, data: data[0]};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

export type JobApplicationActionResponse = {status: true, message: string} | {status: false, message: string};

export const jobApplicationAction = async (data:JobApplicationData): Promise<JobApplicationActionResponse> => {
    try{
        const {jobId,linkedinUrl,coverLetter} = data;
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'applicant') return {status: false,message: "forbidden"};
        await db.transaction(async (tx) => {
            const [result] = await tx.insert(resumesTableSchema).values({applicantId:user.id,linkedinUrl,coverLetter});
            await tx.insert(applicationsTableSchema).values({jobId,applicantId:user.id,resumeId:result.insertId});
        });
        return {status: true, message: "Applied for job successfully"};
    }catch(error:any){
        console.log(error.message);
        return {status: false, message: "Job application failed due to some reasons."};
    }
}

export type GetSingleJobApplicationDataResponse = { status: true, data: any } | { status: false, message: string };

export const getSingleJobApplicationDataAction = async (job_id:number): Promise<GetSingleJobApplicationDataResponse> => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'applicant') return {status: false,message: "forbidden"};
        const [jobApplication] = await db.select().from(applicationsTableSchema).where(and(
            eq(applicationsTableSchema.jobId,job_id),
            eq(applicationsTableSchema.applicantId,user.id)
        ));
        return {status: true, data: jobApplication};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

export type ApplicantApplication = {
    applications: {
        id: number;
        jobId: number;
        applicantId: number;
        resumeId: number;
        status: typeof APPLICATION_STATUS[number];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
    jobs: {
        id: number;
        title: string;
        employerId: number;
        description: string;
        tags: string | null;
        minSalary: number | null;
        maxSalary: number | null;
        salaryCurrency: keyof typeof currencySymbols | null;
        salaryPeriod: string | null;
        location: string | null;
        jobType: string | null;
        workType: string | null;
        jobLevel: string | null;
        experience: string | null;
        minEducation: string | null;
        isFeatured: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        expiresAt: Date | null;
    };
    employers: {
        id: number;
        company_name: string;
        description: string | null;
        avatarUrl: string | null;
        bannerImageUrl: string | null;
        organizationType: string | null;
        teamSize: string | null;
        yearOfEstablishment: number | null;
        websiteUrl: string | null;
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
};

export type GetAllJobApplicationDataResponse = { status: true, data: any } | { status: false, message: string };

export const getAllJobApplicationDataAction = async (): Promise<GetAllJobApplicationDataResponse> => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        if(user?.role !== 'applicant') return {status: false,message: "forbidden"};
        const jobApplications = await db.select({
            applications: applicationsTableSchema,
            jobs: jobsTableSchema,
            employers: employersTableSchema
        }).from(applicationsTableSchema)
        .innerJoin(jobsTableSchema,eq(applicationsTableSchema.jobId,jobsTableSchema.id))
        .leftJoin(employersTableSchema,eq(jobsTableSchema.employerId,employersTableSchema.id))
        .where(eq(applicationsTableSchema.applicantId,user.id))
        .orderBy(desc(applicationsTableSchema.createdAt));
        return {status: true, data: jobApplications};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}