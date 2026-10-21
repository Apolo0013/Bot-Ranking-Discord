import { REST, Routes } from "discord.js";
import { startCommand } from "./start.command.js";
import { responseCommand } from "./response.command.js";
import { perfilCommand } from "./perfil.command.js";
import { rankingCommand } from "./ranking.command.js";
import { configXpCommand } from "./config-xp.command.js";

//aqui nois vai regitrar os comandos
export default async function registerCommand() {
    const rest = new REST({ version: "10" }).setToken(
        process.env.DISCORD_TOKEN!
    )
    //lista de comandos
    const commands = [
        startCommand,
        responseCommand,
        perfilCommand,
        rankingCommand,
        configXpCommand
    ]
    //fazer contanto com discord para registrar o slash        
    try {
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID!,
                process.env.GUILD_ID!
            ), {
                body: commands.map(cmd => cmd.toJSON())
        })
        console.log("SLASH REGISTRADOS")
    }
    catch (error) {
        console.warn(error)
        console.log("SLASH NAO REGISTRADOS")
    }
}



async function cleanAllCommands(rest: REST) {
    try {
        const guildId = process.env.GUILD_ID!
        const clientId = process.env.CLIENT_ID!
        console.log('🧹 A iniciar a limpeza total dos Slash Commands...');

        // 1. Limpa todos os comandos do Servidor específico
        if (guildId && guildId !== 'TEU_GUILD_ID_AQUI') {
            await rest.put(Routes.applicationGuildCommands(clientId!, guildId), { body: [] });
            console.log('✅ Comandos do servidor limpos!');
        }

        // 2. Limpa todos os comandos Globais
        await rest.put(Routes.applicationCommands(clientId!), { body: [] });
        console.log('✅ Comandos globais limpos!');

        console.log('🎉 Limpeza concluída com sucesso! Nenhum comando restou.');
    } catch (error) {
    console.error('❌ Erro ao limpar os comandos:', error);
}
}

