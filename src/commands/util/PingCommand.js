const Command = require("../../structures/command")
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            category: "util",
        })
    }
    async run(message, args) {

        message.channel.send('🏓').then(msg => {
            msg.edit(`🏓\n**Ping:** \`${Math.round(this.client.ws.ping)}\`ms!  | **API:** \`${Date.now() - message.createdTimestamp}\`ms`)
        })

    }
}