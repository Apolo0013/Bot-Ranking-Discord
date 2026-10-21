import { EmbedBuilder } from "discord.js";
import { UserDB } from "../repository/type.js";
import { getUserById } from "../services/user.service.js";


/**
 * Essa funcao é componente que vai mostrar uma listinha do rank
 * @param users lista do usuario do rank, ja ordenados 
 */
export async function UIEmbedRankUsers(users: UserDB[]) {
    //lista de emoji rank
    const emojiRank: Record<number, string> = {
        1: '🥇',
        2: '🥈',
        3: '🥉',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
        10: '🔟',
    }
    //Criando um fields dinamico
    const fields: { name: string, value: string, inline: boolean}[] = []
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        fields.push({
            name: `${emojiRank[i + 1]} - ${user.name}`,
            value: `Total de XP: \`${user.xp}\`XP`,
            inline: i == 0
        })
    }
    //pegando a foto de perfil do TOP 1
    const userTOP1 = await getUserById(users[0].id_discord) // buscando o usuario por id pela API do discord
    const iconTOP1 = userTOP1  //// pegando url do avatar dele
        ? userTOP1.displayAvatarURL({size: 256})
        : null
    console.log(iconTOP1)
    //criando o embed
    const embed = new EmbedBuilder()
        .setTitle(`TOP ${users.length} do servidor`)
        .setColor("#f5ed0f")
        .setThumbnail(iconTOP1)
        .setTimestamp()
        .addFields(fields)
        .setFooter({text: `TOP ${users.length} de XP`})
    return embed
}
