import { ActionRowBuilder, ButtonBuilder } from "discord.js"

export type ReturnUIresponseChallageDisabledBtn = {
    components: ActionRowBuilder<ButtonBuilder>[],
    content: string
}

export type ParamUIEmbedRespondQuestion = {
    question: string,
    formula: string
}

export type ParamUIEmbedFinalQuestion = {
    itWin: boolean,
    idUser: string
}