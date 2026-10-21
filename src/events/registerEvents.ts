import { Client } from "discord.js";
//eventos
import { registerMessageEvent } from "./message.event.js";
import { registerInteractionCreateEvent } from "./interaction-create.js";

export default function registerEvents(client: Client) {
    registerMessageEvent(client)
    registerInteractionCreateEvent(client)
}