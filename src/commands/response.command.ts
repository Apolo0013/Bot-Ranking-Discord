import { SlashCommandBuilder } from "discord.js";

export const responseCommand = new SlashCommandBuilder()
    .setName("responder")
    .setDescription("responda a pergunta")
    .addIntegerOption(op => 
        op
            .setName("numero")
            .setDescription("add o numero aqui")
            .setRequired(true)
    )