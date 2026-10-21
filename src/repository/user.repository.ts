import { db } from "../data-base/connection-db.js";
import { ParamAddUserDB, UserDB } from "./type.js";

/*
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        id_discord VARCHAR(200) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        xp INT NOT NULL
    )

*/

export async function addUserDB({
    nome,
    id_discord
}: ParamAddUserDB) {
    const isRegister = await findUserDB(id_discord)
    if (!isRegister) {    
        await db.query(`
            INSERT INTO users (id_discord, name, xp)
                VALUES ($1, $2, 0)
            ;
        `, [id_discord, nome])
    }
}

export async function getUserDB(id_discord: string): Promise<UserDB | undefined> {
    const data = await db.query(`
        SELECT * 
        FROM users
        WHERE id_discord = $1
    `, [id_discord])
    const user: UserDB | undefined = data.rows[0]
    return user
}

export async function findUserDB(id_discord: string): Promise<boolean> {
    const data = await db.query(`
        SELECT id_discord 
        FROM users 
        WHERE $1 = id_discord;
        `, [id_discord])
    const row: string | undefined
        = data.rows[0]
    return !(row === undefined)
}