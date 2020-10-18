const Command = require("../../structures/command")

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ["banir"],
            category: "moderação",
            ClientPermissions: ["BAN_MEMBERS"],
            UserPermission: ["BAN_MEMBERS", "EMBED_LINKS"]
        })
    }
    async run(message, args) {

        
		if (!args[0]) return message.reply("você não mencionou quem desejas banir")
		const member = client.users.get(args[0].replace(/[<@!>]/g, ""))
		if (!member) return message.reply("Usuário não encontrado")
		let inGuild
		inGuild = message.guild.members.cache.get(member.id)
		if (!inGuild) {
			inGuild = member
		}
		let reason = args.slice(1).join(" ")
		if (!reason) {
			reason = "Sem razão informada"
		}

		if (inGuild.id === message.author.id) return message.reply("você não pode banir a si mesmo")
		if (message.guild.members.cache.has(inGuild.id)) {
			if (message.member.roles.highest.position <= message.guild.member(member).roles.highest.position) return message.reply("você não pode banir este usuário pois ele é do mesmo, ou maior cargo que o seu")
			if (!inGuild.bannable) return message.reply("eu não posso banir este usuário, talvez meu cargo seja menor que o dele...")
		}

		message.guild.members.ban(inGuild.id, {
			days: 7,
			reason: `Banido por ${message.author.tag} - Motivo: ${reason}`
		}).then((user) => {
			let avatar = user.displayAvatarURL({ format: "png", dynamic: true })

			const embed = new MessageEmbed()
				.setTitle(`${user.tag} foi banido!`)
				.setColor('#c1001d')
				.setThumbnail(avatar)
				.addField("Nome do usuário", user.tag, true)
				.addField("Id do usuário", user.id, true)
				.addField("Autor", message.author.tag, true)
				.addField("Motivo", reason, true)

			message.channel.send(embed)

		})

    }
}