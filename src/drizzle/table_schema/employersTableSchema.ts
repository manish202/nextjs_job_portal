import { mysqlTable, int, varchar, text, datetime, year } from 'drizzle-orm/mysql-core';
import usersTableSchema from "@/drizzle/table_schema/usersTableSchema";

const employersTableSchema = mysqlTable('employers', {
    id: int("id").primaryKey().references(() => usersTableSchema.id, {onDelete: "cascade"}),
    description: text("description"),
    avatarUrl: text("avatar_url"),
    bannerImageUrl: text("banner_image_url"),
    organizationType: varchar("organization_type",{ length: 100 }),
    teamSize: varchar("team_size",{ length: 50 }),
    yearOfEstablishment: year("year_of_establishment"),
    websiteUrl: varchar("website_url",{ length: 255 }),
    location: varchar("location",{ length: 255 }),
    createdAt: datetime("created_at").defaultNow().notNull(),
    updatedAt: datetime("updated_at").defaultNow().notNull().onUpdateNow(),
    deletedAt: datetime("deleted_at"),
});

export default employersTableSchema;