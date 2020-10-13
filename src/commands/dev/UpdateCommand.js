const Command = require("../../structures/command")
const {MessageEmbed} = require("discord.js")
module.exports = class UpdateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "update",
            category: "dev",
            ClientPermissions: ["EMBED_LINKS"],
            OnlyDevs: true
        })
    }
    async run(message, args) {

        const canal = await this.client.channels.cache.get('757292554445127722')
        const role = message.guild.roles.cache.get('758706770675105802')

        const embed = new MessageEmbed()
        .setTitle("🟡 | ATUALIZAÇÃO")
        .setColor("#ffe752")
        .setDescription("A Menhera vai reiniciar para aplicar uma atualização\nCheque <#730904048475046069> para ver as novidades")
        .setTimestamp()
         canal.send(role, embed)
         message.react('✅')
    }
}