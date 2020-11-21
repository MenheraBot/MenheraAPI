const Command = require("../../structures/command")
module.exports = class ReloadCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            category: "dev",
            ClientPermissions: ["EMBED_LINKS"],
            UserPermissions: ["MANAGE_GUILD"],
            OnlyDevs: true
        })
    }

    async run(message, args) {
        if(!args[0]) return message.channel.send("error! me dê uma opção válida. Opções disponíveis: `evento`, `comando`")
        const option = this.getOption(args[0], ["command", "comando"], ["evento", "event"])
		if (!option) return message.channel.send("error! me dê uma opção válida. Opções disponíveis: `evento`, `comando`")
		if (!args[1]) return message.channel.send("error! me dê um comando/evento para recarregar.")
		const type = option === "yes" ? "comando" : "evento"

		const rst = option === "yes" ? this.client.reloadCommand(args[1]) : this.client.reloadEvent(args[1])
		if (rst instanceof Error) return message.channel.send(`error falha no recarregamento do ${type}.Stack:\n\`\`\`js${rst}\`\`\``)
		if (rst === false) return message.channel.send(`error! ${type} inexistente.`)

		message.channel.send(`success ${type} recarregado com sucesso!`)
    }
}