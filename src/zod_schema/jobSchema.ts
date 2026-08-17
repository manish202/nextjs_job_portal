import { z } from "zod";
import {
    SALARY_CURRENCY,
    SALARY_PERIOD,
    JOB_TYPE,
    WORK_TYPE,
    JOB_LEVEL,
    MIN_EDUCATION,
} from "@/drizzle/table_schema/jobsTableSchema";

export const jobSchemaBase = z.object({
    id: z.number().int().nonnegative().optional().nullable(),
    title: z
        .string()
        .trim()
        .min(1, "Job title is required")
        .max(255, "Job title must not exceed 255 characters"),
    jobType: z.enum(JOB_TYPE).optional(),
    workType: z.enum(WORK_TYPE).optional(),
    jobLevel: z.enum(JOB_LEVEL).optional(),
    location: z
        .string()
        .trim()
        .min(2, "location must be at least 2 character long")
        .max(255, "location must not exceed 255 characters"),
    tags: z
        .string()
        .trim()
        .min(2,"Job tags must be at least 2 character long")
        .max(500, "Job tags must not exceed 500 characters"),
    minSalary: z
        .number()
        .int("Minimum salary must be a whole number")
        .positive("Minimum salary must be greater than 0")
        .optional()
        .nullable(),
    maxSalary: z
        .number()
        .int("Maximum salary must be a whole number")
        .positive("Maximum salary must be greater than 0")
        .optional()
        .nullable(),
    salaryCurrency: z.enum(SALARY_CURRENCY).optional(),
    salaryPeriod: z.enum(SALARY_PERIOD).optional(),
    minEducation: z.enum(MIN_EDUCATION).optional(),
    expiresAt: z
        .date()
        .optional()
        .nullable()
        .refine((date) => !date || date > new Date(), { message: "Expiry date must be in the future", }),
    experience: z
        .string()
        .trim()
        .min(2, "experience must be at least 2 character required")
        .max(1000, "experience must not exceed 1000 characters"),
    isFeatured: z.boolean(),
    description: z
        .string()
        .trim()
        .min(1, "Job description is required")
        .max(5000, "Job description must not exceed 5000 characters"),
});

export const addJobSchema = jobSchemaBase.refine(
    (data) => (data.minSalary && data.maxSalary) ? data.minSalary <= data.maxSalary : true,
    {
        message: "Minimum salary must be greater than or equal to minimum salary",
        path: ["maxSalary"],
    }
);

export type JobPostInsertFormData = z.infer<typeof addJobSchema>;
export const updateJobSchema = jobSchemaBase.partial();
export type JobPostUpdateFormData = z.infer<typeof updateJobSchema>;