import { Client, Events } from "discord.js";

export function registerMessageEvent(client: Client) {
    // Evento disparado sempre que uma mensagem é enviada no servidor
    client.on(Events.MessageCreate, async (message) => {
        // Ignora mensagens enviadas por outros bots (evita loops infinitos)
        if (message.author.bot) return;
        console.log(`${message.author.username} falou: ${message.content}`)
    });
}