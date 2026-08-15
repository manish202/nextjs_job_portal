import { relations } from 'drizzle-orm/_relations';
import { mysqlTable, mysqlEnum, int, varchar, text, boolean, datetime } from 'drizzle-orm/mysql-core';
import employersTableSchema from './employersTableSchema';

export const SALARY_CURRENCY = ["USD","EUR","GBP","CAD","AUD","JPY","INR","NPR"] as const;
export const SALARY_PERIOD = ["hourly","monthly","yearly"] as const;
export const JOB_TYPE = ["remote","hybrid","on-site"] as const;
export const WORK_TYPE = ["full-time","part-time","contract","temporary","freelance"] as const;
export const JOB_LEVEL = ["internship","entry-level","junior","mid-level","senior-level","lead","manager","director","executive"] as const;
export const MIN_EDUCATION = ["none","high-school","undergraduate","masters","phd"] as const;

const jobsTableSchema = mysqlTable('jobs', {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title",{ length: 255 }).notNull(),
    employerId: int("employer_id").notNull().references(() => employersTableSchema.id, {onDelete: "cascade"}),
    description: text("description").notNull(),
    tags: text("tags"),
    minSalary: int("min_salary"),
    maxSalary: int("max_salary"),
    salaryCurrency: mysqlEnum("salary_currency",SALARY_CURRENCY),
    salaryPeriod: mysqlEnum("salary_period",SALARY_PERIOD),
    location: varchar("location",{ length: 255 }),
    jobType: mysqlEnum("job_type",JOB_TYPE),
    workType: mysqlEnum("work_type",WORK_TYPE),
    jobLevel: mysqlEnum("job_level",JOB_LEVEL),
    experience: text("experience"),
    minEducation: mysqlEnum("min_education",MIN_EDUCATION),
    isFeatured: boolean("is_featured").default(false).notNull(),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    expiresAt: datetime("expires_at"),
});

export const jobsRelations = relations(jobsTableSchema, ({one}) => ({
    employer: one(employersTableSchema,{
        fields: [jobsTableSchema.employerId],
        references: [employersTableSchema.id],
    }),
}));

export default jobsTableSchema;