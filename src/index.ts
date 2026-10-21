
import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
//registrar
import registerEvents from './events/registerEvents.js';
import registerCommand from './commands/register.command.js';
import { UserInGame } from './services/type.js';
import { readConfig } from './config/config.js';
//carrregarr config global
import './config/config.js'

// Carrega as variáveis do arquivo .env
dotenv.config();
console.log("VARIAVEL AMBIENTES:")
console.log(`
DISCORD_TOKEN=${process.env.DISCORD_TOKEN}
CLIENT_ID=${process.env.CLIENT_ID}
GUILD_ID=${process.env.GUILD_ID}
DB_PASSWORD=${process.env.DB_PASSWORD}
`)

await readConfig()

// Inicializa o cliente do Discord com os privilégios (Intents) necessários
export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,             // Acesso a servidores
        GatewayIntentBits.GuildMessages,      // Acesso a mensagens em canais
        GatewayIntentBits.MessageContent,     // Permissão para ler o conteúdo de mensagens
    ],
});

export const UsersInGame: Record<string, UserInGame> = {}

// Evento disparado quando o bot se conecta com sucesso
client.once(Events.ClientReady, (readyClient) => {
    console.log(`🤖 Bot online com sucesso como: ${readyClient.user.tag}`);
    //registrar os eventos
    registerEvents(client) // eventos
    registerCommand() // registrar comandos slash
});

// Conecta o bot usando o Token do arquivo .env
client.login(process.env.DISCORD_TOKEN);