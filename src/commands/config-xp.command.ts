import { SlashCommandBuilder } from "discord.js";

export const configXpCommand = new SlashCommandBuilder()
    .setName("config-xp")
    .setDescription("ADMIN: definar o os ganhos de xp")
    .addIntegerOption(op => 
        op
            .setName('xp-win')
            .setDescription("Definir quanto de XP o usuário ganha por vitória.")
            .setRequired(true)
    )
    .addIntegerOption(op => 
        op  
            .setName('xp-lose')
            .setDescription('Definir quanto de XP o usuário ganha por derrota.')
            .setRequired(true)
    )
