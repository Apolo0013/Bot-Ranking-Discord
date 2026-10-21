import { ColorResolvable, EmbedBuilder } from "discord.js";

export type ParamUIEmbedConfigXpReport = {
    result: boolean,
    xpWin: number,
    xpLose: number
}

export function UIEmbedConfigXpReport({
    result,
    xpLose,
    xpWin
}: ParamUIEmbedConfigXpReport) {
    //propriedade
    const corLateral: string = result
        ? '#289e28'
        : "#ff2908"
    const descricao = result
        ? "As configurações foram atualizadas com sucesso."
        : "Não foi possível atualizar as configurações."
    const embed = new EmbedBuilder()
        .setTitle("Relatório de configuração de XP")
        .setColor(corLateral as ColorResolvable)
        .setDescription(descricao)
        .addFields(
            { name: "XP por vitória", value: `${xpWin}`, inline: true },
            { name: "XP por derrota", value: `${xpLose}`, inline: true },
            {
                name: "Status",
                value: result ? "Sucesso" : "Erro",
                inline: true
            }
        )
    return embed
}