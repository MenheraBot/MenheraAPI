const Command = require("../../structures/command")
module.exports = class GiveRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "giverole",
            aliases: ["gr"],
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

            const apolo = await this.client.database.familia.findById("Apolo")
            const loki = await this.client.database.familia.findById("Loki")
            const ares = await this.client.database.familia.findById("Ares")
            const soma = await this.client.database.familia.findById("Soma")
            const freya = await this.client.database.familia.findById("Freya")

            let apoloMembers = []
            let lokiMembers = []
            let aresMembers = []
            let somaMembers = []
            let freyaMembers = []

            apolo.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    if (message.guild.members.cache.get(member).roles.cache.has(roleApolo)) apoloMembers.push(message.guild.members.cache.get(member).user.username)
                    message.guild.members.cache.get(member).roles.add(roleApolo)
                }
            })
            loki.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    if (message.guild.members.cache.get(member).roles.cache.has(roleLoki)) lokiMembers.push(message.guild.members.cache.get(member).user.tag)
                    message.guild.members.cache.get(member).roles.add(roleLoki)
                }
            })
            ares.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    if (message.guild.members.cache.get(member).roles.cache.has(roleAres)) aresMembers.push(message.guild.members.cache.get(member).user.tag)
                    message.guild.members.cache.get(member).roles.add(roleAres)
                }
            })
            soma.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    if (message.guild.members.cache.get(member).roles.cache.has(roleSoma)) somaMembers.push(message.guild.members.cache.get(member).user.tag)
                    message.guild.members.cache.get(member).roles.add(roleSoma)
                }
            })
            freya.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    if (message.guild.members.cache.get(member).roles.cache.has(roleFreya)) freyaMembers.push(message.guild.members.cache.get(member).user.tag)
                    message.guild.members.cache.get(member).roles.add(roleFreya)
                }
            })
    }
}