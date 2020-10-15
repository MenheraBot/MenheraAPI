module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run() {
        console.log("[READY] MENHERA WATCH IS READY")
        let status = [{
                name: "Averiguando meu Servidor de suporte",
                type: "PLAYING"
            },
            {
                name: "Meu prefixo é ..",
                type: "PLAYING"
            }
        ]

        setInterval(() => {
            let randomStatus = status[Math.floor(Math.random() * status.length)]
            this.client.user.setPresence({
                activity: randomStatus
            })
        }, 1000 * 60)

        setInterval(async () => {
            require('../structures/TopFamilyChecks').run()
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

            apolo.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    message.guild.members.cache.get(member).roles.add(roleApolo)
                }
            })
            loki.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    message.guild.members.cache.get(member).roles.add(roleLoki)
                }
            })
            ares.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    message.guild.members.cache.get(member).roles.add(roleAres)
                }
            })
            soma.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    message.guild.members.cache.get(member).roles.add(roleSoma)
                }
            })
            freya.members.forEach(member => {
                if (message.guild.members.cache.has(member)) {
                    message.guild.members.cache.get(member).roles.add(roleFreya)
                }
            })
        }, 1000 * 60 * 60 * 12)
    }
}