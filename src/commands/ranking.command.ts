import { SlashCommandBuilder } from "discord.js";

export const rankingCommand = new SlashCommandBuilder()
    .setName('ranking')
    .setDescription("ver o rank")
    .addIntegerOption(op => 
        op
            .setName("limit")
            .setDescription("quantos usuario que ver no rank 1-10")
            .setMaxValue(10)
            .setMinValue(3)
    )