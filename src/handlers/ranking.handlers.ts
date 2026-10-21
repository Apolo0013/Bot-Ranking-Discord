import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { getRankDB } from "../repository/ranking.repository.js";
import { UIEmbedRankUsers } from "../components/ranking.UI.js";

export async function handlerChatInputRanking(interaction: ChatInputCommandInteraction) {
    //pegando o limite no max 10
    const limit = interaction.options.getInteger("limite") || 10
    const users = await getRankDB(limit)
    if (users) {
        const embed = await UIEmbedRankUsers(users)
        await interaction.reply({
            content: "",
            embeds: [embed]
        })
    }
    else {
        await interaction.reply({
            content: "Algo deu errado ao tentar pegar rank",
            flags: [MessageFlags.Ephemeral]
        })
    }
}