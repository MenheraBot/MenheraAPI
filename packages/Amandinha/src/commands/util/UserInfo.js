const Command = require("../../structures/command")
const {MessageEmbed} = require("discord.js")
const moment = require("moment")
module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "userinfo",
            category: "util",
        })
    }
    async run(message, args) {

        moment.locale("pt-br")

        let member
        if(args[0]){
            try{
            member = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
            } catch {
                return message.channel.send("Usuário inexistente")
            }
        } else member = message.author


        let status = `${member.presence.status}`.replace("dnd", "🔴 | Não Perturbe").replace("idle", "🟡 | Ausente").replace("offline", "⚪ | Offline").replace("online", "🟢 | Online")
		let color = message.guild.member(member) ? message.guild.member(member).displayHexColor : "#000000"
		let avatar = member.displayAvatarURL({ dynamic: true, format: "png" })

		const embed = new MessageEmbed()
			.setColor(color)
			.setThumbnail(avatar)
			.addField(":bookmark: Tag do Discord", `\`${member.tag}\``, true)
			.addField(":computer: ID do Discord", `\`${member.id}\``, true)
			.addField(":trophy: Cargo mais Alto", message.guild.member(member) ? message.guild.member(member).roles.highest : "`USER NOT IN GUILD`", true)
			.addField("Status", status, true)
			.addField(":star2: Entrou dia", message.guild.member(member) ? moment(message.guild.member(member).joinedAt).format('DD/MM/YYYY') : "`USER NOT IN GUILD`", true)
			.addField(":date: Conta criada dia", moment(member.createdAt).format('DD/MM/YYYY'), true)

       message.channel.send(embed)
    }
}