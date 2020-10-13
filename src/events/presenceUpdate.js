const config = require("../../config.json")
const Discord = require("discord.js")
module.exports = class {
    constructor(client) {
        this.client = client
    }
    async run(oldPresence, newPresence) {
        if (newPresence.user.id != config.menheraId) return;

        const canal = await this.client.channels.cache.get('757292554445127722')
        const role = await this.client.guilds.cache.get('717061688460967988').roles.cache.get('758706770675105802')

        if (newPresence.user.presence.activities.length > 0) {
            if (newPresence.user.presence.activities[0].name === "Fui reiniciada com sucesso uwu") {
                const embed = new Discord.MessageEmbed()
                    .setTitle("🟣 | REINICIADA")
                    .setColor("#792bd1")
                    .setDescription("A Menhera foi reiniciada e já está respondendo à comandos")
                    .setTimestamp()
                canal.send(role, embed)
            }
        }

        if (oldPresence.status == newPresence.status) return;
        if (newPresence.status == "online") {
            const embed = new Discord.MessageEmbed()
                .setTitle("🟢 | ONLINE")
                .setColor("#05ff1c")
                .setDescription("A Menhera está ONLINE novamente")
                .setTimestamp()
            canal.send(role, embed)
        }
        if (newPresence.status == "offline") {
            const embed = new Discord.MessageEmbed()
                .setTitle("🔴 | OFFLINE")
                .setColor("#ff0505")
                .setDescription("A Menhera acaba de ficar OFFLINE, vou notificar minha dona para ver isso")
                .setTimestamp()
            canal.send(role, embed)
        }
    }
}