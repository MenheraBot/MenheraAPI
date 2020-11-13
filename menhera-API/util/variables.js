class Variaveis {
    //Eu queria usar TypeScript para poder proteger o _commands, mas tive problemas depois de compilado, então fodase
    constructor() {
        this._commands = []
        this._logs = []
    }

    getCommands() {
        return { lenght: this._commands.length, commands: this._commands }
    }

    setCommands(authorName, authorId, guildName, guildId, commandName, data) {
        this._commands.push({ authorName, authorId, guildName, guildId, commandName, data })
    }

    clearCommands() {
        this._commands = []
    }

    getLogs() {
        return this._logs;
    }

    setLogs(log) {
        this._logs.push(log)
    }
}

const variaveis = new Variaveis()

module.exports = variaveis