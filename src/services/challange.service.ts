import { ButtonInteraction, CacheType, ChatInputCommandInteraction, Interaction, MessageFlags, User } from "discord.js";
import { UsersInGame } from "../index.js";
import { userExists } from "./user.service.js";
//config
import { _config } from "../config/config.js";
import { updateXpDB } from "../repository/xp.respositoty.js";
import { ParamfinalChallage } from "./type.js";

/**
 * Retorna um número inteiro aleatório entre min e max (ambos inclusivos, igual ao randint do Python).
 * @param min Valor mínimo (inteiro)
 * @param max Valor máximo (inteiro)
 */
function randint(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Essa funcao vai retorna um lista com 2 numero a parti de um numero X
 * @param numX valor que sera usado (Number(Int))
*/
export function genereteNumbersBase(numX: number, max: number = 3): number[] {
    const listNums: number[] = []
    for (let i = 0; i < max; i++) {
        //vai subtrair?(tambem poderia usar adicao)
        const isSub = randint(0, 1) == 0
        if (isSub) {
            const numSort = numX - randint(1, 5)
            listNums.push(numSort < 0 ? 0 : numSort)
        }
        else listNums.push(numX + randint(1, 5))
    }
    return listNums
}

//gerando o desafio para o usuario
export function genereteChallenge(user: User): boolean {
    const idUser = user.id
    //so nao passa daqui é:
    // se o usuario nao existi na lista
    //& caso exista, ele nao deve ter uma desafio ativo ou seja deve esta com valor null pra passa aqui.
    if (!userExists(idUser) || UsersInGame[idUser].challenge) return false // algo deu errado: usuario esta registrado
    //gerando os numeros
    const [num1, num2] = [randint(1, 20), randint(1, 20)]
    const correctAnswer: number = num1 + num2
    //criando o desafio
    console.log(UsersInGame[idUser])
    UsersInGame[idUser].challenge = {
        challegeText: `${num1} + ${num2}`,
        formula: "x + y",
        numbers: {
            x: num1,
            y: num2
        },
        correctAnswer: correctAnswer,
        idUser: idUser
    }
    //mudando o GameStage/fase do game
    UsersInGame[idUser].gameStage = 'respond'
    console.log("CHAMADO NA CRICAO DO DESAFIO")
    return true // sucesso em gerar
}

/**
 * Esta funcao é chamado no final do desafio
*/
export async function finalChallage({ idUser, itWin }: ParamfinalChallage) {
    //a parti daqui, ja temos certeza que ele ja respondeu.
    //* vamos mudar o gameStage dele para afk
    console.log("RESETE")
    UsersInGame[idUser].gameStage = 'afk'
    UsersInGame[idUser].challenge = null // retirando o desafio
    //Add os ponto no banco de dados
    const { // pegando a quantidade de xp definada da configuracao
        lose,
        win
    } = _config.gains
    await updateXpDB({
        count_xp: itWin ? win : lose,
        id_discord: idUser
    })
}

/**
    * essa funcao vai fazer
    idCustom disso: 'btn-correct-1111111111111'
    para isso: btn-correct
    so vai tirar o id so usuario do idCustom
    * @param idCustom id do components (String)
*/
export const getIdBtnCorrect = (idCustom: string) => idCustom.split('-').slice(0, 2).join('-')
