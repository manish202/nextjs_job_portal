import { mysqlTable, int, varchar, text, datetime } from 'drizzle-orm/mysql-core';
import usersTableSchema from './usersTableSchema';

const sessionsTableSchema = mysqlTable('sessions', {
    id: int("id").primaryKey().autoincrement(),
    sessionId: varchar("session_id",{ length: 255 }).unique(),
    userId: int("user_id").notNull().references(() => usersTableSchema.id, {onDelete: 'cascade'}),
    userAgent: text("user_agent").notNull(),
    ip: varchar("ip",{ length:255 }).notNull(),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    expiresAt: datetime("expires_at").notNull(),
});

export default sessionsTableSchema;