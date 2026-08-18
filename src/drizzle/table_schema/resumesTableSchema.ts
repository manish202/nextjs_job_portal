import { relations } from 'drizzle-orm/_relations';
import { mysqlTable, int, text, datetime } from 'drizzle-orm/mysql-core';
import applicantsTableSchema from './applicantsTableSchema';

const resumesTableSchema = mysqlTable('resumes', {
    id: int("id").primaryKey().autoincrement(),
    applicantId: int("applicant_id").notNull().references(() => applicantsTableSchema.id, { onDelete: "cascade" }),
    linkedinUrl: text("linkedin_url").notNull(),
    coverLetter: text("cover_letter").notNull(),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    deletedAt: datetime("deleted_at"),
});

export const resumesRelations = relations(resumesTableSchema, ({one}) => ({
    applicant: one(applicantsTableSchema,{
        fields: [resumesTableSchema.applicantId],
        references: [applicantsTableSchema.id],
    }),
}));

export default resumesTableSchema;