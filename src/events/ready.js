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

        setInterval(() => {
            require('../structures/TopFamilyChecks').run()
        }, 1000 * 60 * 60 * 24)
    }
}