import { ChatInputCommandInteraction, Embed, MessageFlags } from "discord.js";
import { UIEmbedperfilUser } from "../components/perfil.UI.js";

export async function handlerChatInputPerfil(interaction: ChatInputCommandInteraction) {
    const embedPerfilUI = await UIEmbedperfilUser(interaction.user)
    if (embedPerfilUI) { 
        await interaction.reply({
            content: "",
            embeds: [embedPerfilUI],
            flags: [MessageFlags.Ephemeral]
        })
    }
    else {
        await interaction.reply({
            content: "Algo deu errado em tentar busca seu perfil.",
            flags: [MessageFlags.Ephemeral]
        })
    }
}