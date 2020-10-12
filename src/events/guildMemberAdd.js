module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run(member) {
        const canal = this.client.channels.cache.get('717061688729534632')
        canal.send(`<:guilda:759892389724028948> | Bem-vindx ${member}, espero que se divirta em meu servidor >.<! Use m!help para receber ajuda!\nBeijos de luz da Lux`)
    }
}