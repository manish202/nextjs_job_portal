import { mysqlTable, mysqlEnum, int, varchar, text, datetime, date } from 'drizzle-orm/mysql-core';
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";

const applicantsTableSchema = mysqlTable('applicants', {
    id: int("id").primaryKey().references(() => usersTableSchema.id, {onDelete: "cascade"}),
    biography: text("biography"),
    dateOfBirth: date("date_of_birth"),
    nationality: varchar("nationality",{ length: 100 }),
    maritialStatus: mysqlEnum("maritial_status", ["single","married","divorced"]),
    gender: mysqlEnum("gender", ["male","female","other"]),
    education: mysqlEnum("education", ["none","high school","undergraduate","masters","phd"]),
    experience: text("experience"),
    websiteUrl: varchar("website_url",{ length: 255 }),
    location: varchar("location",{ length: 255 }),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    deletedAt: datetime("deleted_at"),
});

export default applicantsTableSchema;