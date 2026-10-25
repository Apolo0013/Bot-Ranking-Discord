import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ColorResolvable, EmbedBuilder } from "discord.js";
//service
import { genereteNumbersBase, getIdBtnCorrect } from "../services/challange.service.js";
//type
import { ParamUIEmbedFinalQuestion, ParamUIEmbedRespondQuestion, ReturnUIresponseChallageDisabledBtn } from "./type.js";
import { Challenge } from "../services/type.js";
//index
import { UsersInGame } from "../index.js";
//config
import { _config } from "../config/config.js";

/**
 * Embaralha os elementos de um array de forma aleatória (Algoritmo de Fisher-Yates).
 * @param array O array que pretendes embaralhar
 */
function shuffleArray<T>(array: T[]): T[] {
  // Cria uma cópia para não alterar o array original (opcional)
  const copia = [...array];

  for (let i = copia.length - 1; i > 0; i--) {
    // Escolhe um índice aleatório de 0 até i
    const j = Math.floor(Math.random() * (i + 1));

    // Troca os elementos de posição
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

/**
 * Essa funcao vai gerar botoes, ja com as questoes
 * Ele vai gerar os botoes, com alternativas certa e incorretas
 * @param values contem informacoes sobre os botoes
*/
export function UIBtnsQuestion(values: Challenge): ActionRowBuilder<ButtonBuilder> {
    const {
        correctAnswer,
        idUser
    } = values
    const listNumbers: number[] = shuffleArray([
        correctAnswer,
        ...genereteNumbersBase(correctAnswer)
    ])
    const btnsBuilder: ButtonBuilder[] = []
    listNumbers.forEach((num,index) => {
        btnsBuilder.push(
            new ButtonBuilder()
                .setCustomId(
                    correctAnswer == num
                        ? `btn-correct-${idUser}`
                        : `btn-incorrect-${index}-${idUser}`
                )
                .setLabel(String(num))
                .setStyle(ButtonStyle.Danger)
        )
    })
    const line = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(btnsBuilder)
    return line
}

export function UIresponseChallageDisabledBtn(interaction: ButtonInteraction): ReturnUIresponseChallageDisabledBtn {
    const message = interaction.message
    const linesdisabled = message.components.map(row => {
        const actionrow = row as unknown as { components: any[] }
        //pegando as copia do botao, e colocando em um lista
        const newsBtns = actionrow.components.map((com) => {
            const btn = ButtonBuilder.from(com)
            btn.setDisabled(true)
            if (getIdBtnCorrect(com.data.custom_id) == 'btn-correct')
                btn.setStyle(ButtonStyle.Success)
            return btn
        })
        //retornando uma linha
        return new ActionRowBuilder<ButtonBuilder>().addComponents(newsBtns)
    })
    return {
        content: message.content,
        components: linesdisabled
    }
}

//
export function UIEmbedRespondQuestion({
    formula,
    question
}: ParamUIEmbedRespondQuestion ){
    const embed = new EmbedBuilder()
        .setColor("#3ca6fd")
        .setTitle("Pergunta...")
        .addFields(
            { name: "❓Pergunta", value: question, inline: true },
            { name: '📐 Fórmula', value: `\`${formula}\``, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Sistema de Ranking & Quiz' });
    return embed
}

//
export function UIEmbedFinalQuestion({itWin, idUser}: ParamUIEmbedFinalQuestion) {
    //!propriedades do embed
    const formula = 'x + y'
    const corLateral: string = itWin
        ? '#289e28'
        : "#ff2908"
    const titulo: string = itWin
        ? '✅ Resposta Correta!'
        : '❌ Resposta Incorreta!'
    const descricao: string = 'Aqui está o resultado do seu cálculo:'
    //pegando os numero do desafio
    console.log("CHAMDO NA UI")
    console.log(UsersInGame[idUser])
    const {x, y} = UsersInGame[idUser].challenge!.numbers
    const resposta = `${x} + ${y} = ${x + y}`
    //pegando os xp definido na configo
    const {
        lose,
        win
    } = _config.gains
    //!-
    const embed = new EmbedBuilder()
        .setColor(corLateral as ColorResolvable) // Cor da bordar leteral
        .setTitle(titulo) // titulo
        .setDescription(descricao)
        .addFields(
            { name: '📐 Fórmula', value: `\`${formula}\``, inline: true },
            { name: '🏆 Recompensa', value: `\`${itWin ? win : lose}\`XP`, inline: false },
            { name: "❓Resposta: ", value: resposta, inline: false}
        )
        .setTimestamp()
        .setFooter({ text: 'Sistema de Ranking & Quiz' });
    
    return embed
}