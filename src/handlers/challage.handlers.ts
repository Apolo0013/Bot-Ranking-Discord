import { ButtonInteraction, ChatInputCommandInteraction, MessageFlags } from "discord.js";
//UI/componentes
import { UIBtnsQuestion, UIEmbedFinalQuestion, UIEmbedRespondQuestion, UIresponseChallageDisabledBtn } from "../components/responseChallage.UI.js";
//repository
import { updateXpDB } from "../repository/xp.respositoty.js";
//servico
import { finalChallage, genereteChallenge, getIdBtnCorrect } from "../services/challange.service.js";
//index
import { UsersInGame } from "../index.js";

function isUserInteractingBtn(idUser: string, idCustom: string) {
    const idUserInBtn = idCustom.split('-').at(-1)
    return idUser == idUserInBtn
}

//Interacao 
export function handlerChatInputChallage(interaction: ChatInputCommandInteraction) {
    const user = interaction.user
    //antes, vamos ver se ele esta no estado de responde
    //! nao deixa o usuario gerar outro desafio.
    if (UsersInGame[user.id].gameStage == 'respond') {
        interaction.reply({
            content: 'Responda a ultima pergunta lhe dada.',
            flags: [MessageFlags.Ephemeral]
        })
        return
    }
    //gerando o desafio para ele
    const result = genereteChallenge(user)
    if (result) {
        const challage = UsersInGame[user.id].challenge!
        const {
            challegeText,
            formula
        } = challage
        const UIbtnsQuestionComponents = UIBtnsQuestion(challage)
        const UIEmbedQuestion = UIEmbedRespondQuestion({
            formula: formula,
            question: challegeText
        })
        interaction.reply({
            content: "",
            components: [UIbtnsQuestionComponents],
            embeds: [UIEmbedQuestion]
        })
    }
    else interaction.reply("Algo deu errado")
}

export async function handlerButtonChallage(interaction: ButtonInteraction) {
    const idCustom = interaction.customId
    const idUser = interaction.user.id
    //so passa aqui se o usuario que interagio é o mesmo que gerou o botoes
    if (!isUserInteractingBtn(idUser, idCustom)) {
        await interaction.reply(
            {
                content: "Da um fora cara",
                flags: MessageFlags.Ephemeral
            }
        )
        return
    }
    else {
        const itWin = getIdBtnCorrect(idCustom) == 'btn-correct' // acertou?
        //atualizando estados e dados
        await finalChallage({idUser, itWin})
        //UI
        const { components } = UIresponseChallageDisabledBtn(interaction) 
        const embed = UIEmbedFinalQuestion({itWin, idUser})
        //atualizando interacao
        await interaction.update({
            components: components,
            embeds: [embed]
        })
    }
    
}