import { Client, Events } from "discord.js";
//service
import { registerUserInGame } from "../services/user.service.js";
//repository
import { addUserDB } from "../repository/user.repository.js";
//handlers
import { handlerButtonChallage, handlerChatInputChallage } from "../handlers/challage.handlers.js";
import { handlerChatInputPerfil } from "../handlers/perfil.handlers.js";
import { handlerChatInputRanking } from "../handlers/ranking.handlers.js";
import { handlerChatInputConfigXp } from "../handlers/config-xp.handler.js";

export function registerInteractionCreateEvent(client: Client) {
    client.on(Events.InteractionCreate, async (interaction) => {
        const user = interaction.user
        //! registrando o usuario em um lista na memoria
        registerUserInGame(user)
        //registrando usuario no banco de dados
        await addUserDB({
            id_discord: user.id,
            nome: user.globalName || 'sem nome'
        })
        ///interacao por comando
        if (interaction.isChatInputCommand()) {
            const cmd = interaction.commandName
            // -/start
            if (cmd == 'start') {
                handlerChatInputChallage(interaction)
            }
            // -/perfil
            if (cmd == 'perfil') {
                handlerChatInputPerfil(interaction)
            }
            // -/ranking [count-users]
            if (cmd == 'ranking') {
                handlerChatInputRanking(interaction)
            }
            // -/config-xp [xp-win] [xp-lose]
            if (cmd == 'config-xp') {
                handlerChatInputConfigXp(interaction)
            }
        }
        ///interacao por button
        if (interaction.isButton()) {
            handlerButtonChallage(interaction)
        }
    })
}