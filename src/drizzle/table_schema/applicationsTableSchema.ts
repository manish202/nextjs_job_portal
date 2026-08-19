import { relations } from 'drizzle-orm/_relations';
import { mysqlTable, mysqlEnum, int, datetime } from 'drizzle-orm/mysql-core';
import applicantsTableSchema from './applicantsTableSchema';
import jobsTableSchema from './jobsTableSchema';
import resumesTableSchema from './resumesTableSchema';

export const APPLICATION_STATUS = ["pending", "reviewing", "shortlisted", "selected", "rejected"] as const;

const applicationsTableSchema = mysqlTable('job_applications', {
    id: int("id").primaryKey().autoincrement(),
    jobId: int("job_id").notNull().references(() => jobsTableSchema.id, { onDelete: "cascade" }),
    applicantId: int("applicant_id").notNull().references(() => applicantsTableSchema.id, { onDelete: "cascade" }),
    resumeId: int("resume_id").notNull().references(() => resumesTableSchema.id, { onDelete: "restrict" }),
    status: mysqlEnum("status", APPLICATION_STATUS).default("pending"),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    deletedAt: datetime("deleted_at"),
});

export const jobApplicationsRelations = relations(applicationsTableSchema, ({one}) => ({
    job: one(jobsTableSchema,{
        fields: [applicationsTableSchema.jobId],
        references: [jobsTableSchema.id],
    }),
    applicant: one(applicantsTableSchema,{
        fields: [applicationsTableSchema.applicantId],
        references: [applicantsTableSchema.id],
    }),
    resume: one(resumesTableSchema,{
        fields: [applicationsTableSchema.resumeId],
        references: [resumesTableSchema.id],
    }),
}));

export default applicationsTableSchema;