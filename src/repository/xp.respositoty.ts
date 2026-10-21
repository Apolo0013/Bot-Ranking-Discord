import { db } from "../data-base/connection-db.js";
import { ParamUpdateXpDB } from "./type.js";

export async function updateXpDB({
    count_xp,
    id_discord
}: ParamUpdateXpDB) {
    await db.query(`
        UPDATE users
        SET xp = xp + $1
        WHERE id_discord = $2
    `, [count_xp, id_discord])
}