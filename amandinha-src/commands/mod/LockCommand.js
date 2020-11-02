const Command = require("../../structures/command")

module.exports = class LockCommand extends Command {
    constructor(client) {
        super(client, {
            name: "lock",
            category: "moderação",
            ClientPermissions: ["MANAGE_CHANNELS", "MANAGE_ROLES"],
            UserPermission: ["ADMINISTRATOR"],
            OnlyDevs: true
        })
    }
    async run(message, args) {

        if (!args[0]) return message.channel.send("Escolha entre `off` ou `on`")

        if (args[0] == "on") {
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            }).then(g => {
                g.edit({
                    name: g.name + ' 🔒'
                })
                g.send(`🔒 | Este canal foi bloqueado por ${message.author}`)
            })
        } else if(args[0] == "off") {
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: null
            }).then(g => {
                g.edit({
                    name: g.name.replace(/\s*🔒/, '')
                })
                g.send(`🔓 | Canal desbloqueado com sucesso`)
            })
        } else message.reply("Opção inválida")
    }
}