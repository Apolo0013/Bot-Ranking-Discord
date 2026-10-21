import { User } from "discord.js";
import { client, UsersInGame } from "../index.js";

export function userExists(id: string): boolean {
    return !(UsersInGame[id] === undefined)
}

export function registerUserInGame(user: User) {
    const idUser = user.id
    //caso ele ja esteja registrado
    if (userExists(idUser)) return
    //registrando...
    UsersInGame[idUser] = {
        id: idUser,
        iconURL: user.displayAvatarURL(),
        name: user.username,
        gameStage: "afk",
        challenge: null
    }
}

export async function getUserById(id: string): Promise<User | null> {
    if (!client) return null
    try {
        const user = await client.users.fetch(id)
        if (!user) return null
        return user
    }
    catch (error) {
        console.error(error)
        return null
    }
}