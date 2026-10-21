import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { isAdminById, updateGainsXp } from "../config/config.js";
import { UIEmbedConfigXpReport } from "../components/config-xp.UI.js";

export async function handlerChatInputConfigXp(interaction: ChatInputCommandInteraction) {
    //antes vamos saber se ele é admin
    const isAdmin = isAdminById(interaction.user.id)
    if (isAdmin) {
        //parametros
        const xpWin = interaction.options.getInteger('xp-win', true)
        const xpLose = interaction.options.getInteger('xp-lose', true)
        //atualizar a configuracao xp
        const result = await updateGainsXp({
            lose: xpLose,
            win: xpWin
        }) 
        //Embed
        const embedReportUI = UIEmbedConfigXpReport({
            result: result,
            xpLose: xpLose,
            xpWin: xpWin
        })
        //tentativa
        try {
            //manda DM
            await interaction.user.send({
                embeds: [embedReportUI]
            })
            //avisando o mesmo pra olhar o a DM
            await interaction.reply({
                content: 'Verifique sua DM para conferir o relatório da operação..',
                flags: [MessageFlags.Ephemeral]
            })
        }
        catch { // se chegou aqui, pq a dm esta bloqueada
            await interaction.reply({
                embeds: [embedReportUI],
                flags: [MessageFlags.Ephemeral]
            })
        }   
    }
    else {
        interaction.reply({
            content: "Apenas administradores podem usar este comando.",
            flags: [MessageFlags.Ephemeral]
        })
    }
    
}