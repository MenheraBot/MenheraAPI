const Command = require("../../structures/command")
module.exports = class LoliCommand extends Command {
    constructor(client) {
        super(client, {
            name: "loli",
            category: "info",
        })
    }
    async run(message, args) {

        const user = message.mentions.users.first() || message.author

        message.channel.send(`<:ok:727975974125436959> | Sim, ${user}, o comando \`m!loli\` é assim mesmo! É uma referência com programação, se tu não entende lógica de programação, ele realmente não faz sentido, mas o comando é assim mesmo, não precisa reportar como bug.`)
       
    }
}