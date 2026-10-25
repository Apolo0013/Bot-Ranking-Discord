import fs from "node:fs/promises"
import path from 'node:path';
import { fileURLToPath } from 'node:url'
import { Config, Gains } from "./type.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NAME_JSON = "config.json"
const DIR_CONFIG_JSON = path.join(__dirname, NAME_JSON)

//_config comeca com valores default
export let _config: Config = {
    gains: {
        lose: 10, 
        win: 100
    },
    adminsIds: []
}
//ler o json
const read = await readConfig()
console.log(read ? "CONFIGURADO" : "NAO CONFIGURADO")

/**
 * esta funcao retorna true ou false quando alguem e admin ou nao
 * de acordo com lista no json
 * @param id_discod id do usuario que vai ser verificado se é adm ou nao.
*/
export function isAdminById(id_discord: string): boolean {
    return _config.adminsIds
        .some(id =>
            id_discord == id
        )
}

/**
 * Essa funcao vai atualizar Gains/Ganhos de xp
*/
export async function updateGainsXp({ lose, win }: Gains): Promise<boolean> {
    //criando um nova config
    const newConfig = {
        ..._config, // copia o _config
        gains: { // sobre-escrever o gains
            win: win,
            lose: lose
        }
    }
    ///retorna um valor booleano se deu certo ou nao
    const result: boolean = await writeConfig(newConfig)
    if (result) {
        _config = newConfig //
        return true
    }
    else return false
}

/**
 * Esta funcao vai ler o json e add na variavel _config
 * serve pra atualizar esta varivel tambem
*/
export async function readConfig(): Promise<boolean> {
    try {
        const readJson = await fs.readFile(DIR_CONFIG_JSON, 'utf-8')
        const data: Config = JSON.parse(readJson)
        //add na variavel global
        _config = data 
        return true
    }
    catch (error) {
        console.error("ERROR EM readConfig")
        console.log(error)
        return false
    }
}


/**
 * Essa funcao escrever novas config no json.
*/
export async function writeConfig(newConfig: Config): Promise<boolean> {
    try {   
        //transforma em string
        const jsonString = JSON.stringify(newConfig, null, 4)
        //escreve-lo
        await fs.writeFile(DIR_CONFIG_JSON, jsonString, 'utf-8')
        console.log("Nova config escrita com sucesso")
        return true
    }
    catch (error) {
        console.error("ERROR EM writeConfig")
        console.log(error)
        return false
    }
}