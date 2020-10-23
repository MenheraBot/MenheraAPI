const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            category: "util",
        })
    }
    async run(message, args) {

        const embed = new MessageEmbed()
            .setTitle("BotInfo")
            .setColor("#f47fff")
            .addFields([
                {
                    name: "Ping",
                    value: `**Host:** \`${Math.round(this.client.ws.ping)}\`ms\n**API:** \`${Date.now() - message.createdTimestamp}\`ms`,
                    inline: false
                },
                {
                    name: "Uptime",
                    value: moment.duration(this.client.uptime).format("D[d], H[h], m[m], s[s]"),
                    inline: false
                },
                {
                    name: "<:memoryram:762817135394553876> | Memória",
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
                    inline: false
                }
            ])

        message.channel.send(embed)

    }
}