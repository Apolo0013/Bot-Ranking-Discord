import { db } from "../data-base/connection-db.js";
import { UserDB } from "./type.js";

export async function getRankDB(limit: number): Promise<UserDB[] | undefined> {
    const data = await db.query(`
        SELECT *
        FROM users
        ORDER BY xp DESC
        LIMIT $1;
    `, [limit])
    const rank: UserDB[] | undefined = data.rows
    return rank
}