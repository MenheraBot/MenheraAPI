const config = require("../../config.json")
const {MessageEmbed} = require("discord.js")
module.exports = class MessageReceive {
    constructor(client) {
        this.client = client
    }

    async run(message) {

        if (message.channel.type === "dm") return
		if (message.author.bot) return

        if (!message.content.startsWith(config.prefix)) return
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
		const command = args.shift().toLowerCase()
		const comando = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
        if (!comando) return
        
        if (comando.config.OnlyDevs) {
			if (!this.client.config.owners.includes(message.author.id)) return message.channel.send("Este comando é apena para desenvolvedores")
        }
        
        let userPermission = comando.config.UserPermission
		let clientPermission = comando.config.ClientPermission
		if (userPermission !== null) {
			if (!message.member.hasPermission(userPermission)) {
				let perm = userPermission.map(value => `\`${value}\``).join(", ")
				return message.channel.send(`Você precisa das permissões: ${perm} pra executar isso, ${message.author}`)
			}
		}
		if (clientPermission !== null) {
			if (!message.guild.me.hasPermission(clientPermission) || !message.channel.permissionsFor(this.client.user.id).has(clientPermission)) {
					let perm = clientPermission.map(value => `\`${value}\``).join(", ")
				return message.channel.send(`O cliente precisa das permissões: ${perm} pra executar isso`)
			}
        }
        
        try {
			new Promise((res, rej) => {
				message.channel.startTyping()
				res(comando.run( message, args ))
			}).then(() => message.channel.stopTyping()).catch(err => {
				message.channel.stopTyping()
				const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack
				const embed = new MessageEmbed()
				embed.setColor("#ff0015")
				embed.setTitle(`Erro!`)
				embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)

				message.channel.send(embed)
			})
		} catch (err) {
			message.channel.stopTyping()
				const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack
				const embed = new MessageEmbed()
				embed.setColor("#ff0015")
				embed.setTitle(`Erro!`)
				embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)

				message.channel.send(embed)
		}

    }
}