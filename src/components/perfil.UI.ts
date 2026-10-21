import { EmbedBuilder, User } from "discord.js";
import { UsersInGame } from "../index.js";
import { getUserDB } from "../repository/user.repository.js";

export async function UIEmbedperfilUser(user: User): Promise<EmbedBuilder | null> {
    const userDB = await getUserDB(user.id) 
    if (!userDB) return null
    const {
        xp //o quanto de xp contem este usuario
    } = userDB

    const embed = new EmbedBuilder() 
        .setColor("#3ca6fd")
        .setTimestamp()
        .setTitle("Perfil")
        .setThumbnail(user.avatarURL())
        .setFooter({ 
            text: "Perfil de: " + user.displayName
        })
        .addFields(
            { name: "Nome", value: user.username, inline: true },
            { name: "XP", value: `\`${xp}\``, inline: false}
        )
    return embed
}