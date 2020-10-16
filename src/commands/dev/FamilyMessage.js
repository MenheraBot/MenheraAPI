const Command = require("../../structures/command")
module.exports = class GiveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "familymessage",
            aliases: ["fm"],
            category: "dev",
            ClientPermissions: ["EMBED_LINKS"],
            UserPermissions: ["MANAGE_GUILD"],
            OnlyDevs: true
        })
    }

    async run(message, args) {
        message.channel.send("BELEZA")

            const server = this.client.guilds.cache.get("717061688460967988")

            const roleApolo = server.roles.cache.get('765069063146962995')
            const roleLoki = server.roles.cache.get('765069110018703371')
            const roleAres = server.roles.cache.get('765069139885948928')
            const roleSoma = server.roles.cache.get('765069167363096616')
            const roleFreya = server.roles.cache.get('765069003440914443')

            const channelApolo = server.channels.cache.get('766437591540563988')
            const channelLoki = server.channels.cache.get('766437565224976415')
            const channelAres = server.channels.cache.get('766437546158718976')
            const channelSoma = server.channels.cache.get('766437527216193567')
            const channelFreya = server.channels.cache.get('766437575983366154')

            if(!args[0]) return message.channel.send("NO TEXT")

            channelApolo.send(`${args.join(" ")}\n\n${roleApolo}`)
            channelLoki.send(`${args.join(" ")}\n\n${roleLoki}`)
            channelAres.send(`${args.join(" ")}\n\n${roleAres}`)
            channelSoma.send(`${args.join(" ")}\n\n${roleSoma}`)
            channelFreya.send(`${args.join(" ")}\n\n${roleFreya}`)

            message.react('✅')
    }
}