import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './src/drizzle/migration',
    schema: './src/drizzle/table_schema/*.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});