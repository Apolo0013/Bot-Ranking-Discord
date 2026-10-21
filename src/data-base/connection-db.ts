import "dotenv/config";
import { Pool } from "pg";

export const db = new Pool({
    host: "localhost",
    port: 5432,
    database: "bot_ranking",
    user: "postgres",
    password: process.env.DB_PASSWORD,
});
