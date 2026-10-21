export type UserInGame = {
    name: string,
    iconURL: string,
    id: string,
    gameStage: GameStage
    challenge: Challenge | null
}

export type Challenge = {
    formula: "x + y",
    challegeText: string,
    numbers: { x: number, y: number },
    correctAnswer: number,
    idUser: string
}

export type GameStage = 
    "afk" |// nao esta fazendo nada ou nao esta interagindo com bot
    "respond" // esta para responde

export type ParamfinalChallage = {
    idUser: string,
    itWin: boolean
}