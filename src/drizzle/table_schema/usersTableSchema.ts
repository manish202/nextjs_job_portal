import { relations } from 'drizzle-orm/_relations';
import { mysqlTable, mysqlEnum, int, varchar, text, datetime } from 'drizzle-orm/mysql-core';
import employersTableSchema from './employersTableSchema';
import applicantsTableSchema from './applicantsTableSchema';
import sessionsTableSchema from './sessionsTableSchema';

const usersTableSchema = mysqlTable('users', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name",{ length: 255 }).notNull(),
    userName: varchar("user_name",{ length: 255 }).notNull(),
    password: text("password").notNull(),
    email: varchar("email",{ length: 255 }).notNull().unique(),
    role: mysqlEnum("role",["admin","applicant","employer"]).default("applicant"),
    phoneNumber: varchar("phone_number",{ length: 255 }),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    deletedAt: datetime("deleted_at"),
});

export const usersRelations = relations(usersTableSchema, ({one,many}) => ({
    employer: one(employersTableSchema,{
        fields: [usersTableSchema.id],
        references: [employersTableSchema.id],
    }),
    applicant: one(applicantsTableSchema,{
        fields: [usersTableSchema.id],
        references: [applicantsTableSchema.id],
    }),
    session: many(sessionsTableSchema),
}));

export default usersTableSchema;