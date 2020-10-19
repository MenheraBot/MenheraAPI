const {
    MessageEmbed
} = require("discord.js")

module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run(member) {
        const canal = this.client.channels.cache.get('717061688498847801')
        const embed = new MessageEmbed()
            .setAuthor(member.tag, member.displayAvatarURL({
                dynamic: true
            }))
            .setTitle("<:MenheraWave:767210250545659906> | Bem vindo")
            .setDescription(`Olá ${member}, seja bem vindx no servidor de suporte da Menhera! Para ver todos os comandos da Menhera use m!help\nBeijos de luz da Lux`)
            .setFooter(`UserID: ${member.id}`)
            .setImage('https://i.imgur.com/p3IUT0Y.png')
        canal.send(member, embed)

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

        if (apolo.members.includes(member.id.toString())) member.roles.add(roleApolo)
        if (loki.members.includes(member.id.toString())) member.roles.add(roleLoki)
        if (ares.members.includes(member.id.toString())) member.roles.add(roleAres)
        if (soma.members.includes(member.id.toString())) member.roles.add(roleSoma)
        if (freya.members.includes(member.id.toString())) member.roles.add(roleFreya)
    }
}