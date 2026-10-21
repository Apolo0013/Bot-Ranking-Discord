import { ChatInputApplicationCommandData, SlashCommandBuilder } from "discord.js"

export type SlashCommand = {
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputApplicationCommandData) => Promise<void>
}