//XP
export type ParamUpdateXpDB = {
    id_discord: string,
    count_xp: number
}

//USER
export type UserDB = {
    id: number,
    id_discord: string,
    name: string,
    xp: number
}

export type ParamAddUserDB = {
    id_discord: string,
    nome: string,
}
