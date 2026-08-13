import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// 1st way
const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

// 2nd way
// const poolConnection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

const db = drizzle({ client: poolConnection });

export default db;