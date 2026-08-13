import { mysqlTable, mysqlEnum, int, varchar, text, datetime } from 'drizzle-orm/mysql-core';

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

export default usersTableSchema;