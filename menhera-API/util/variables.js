module.exports = class Variaveis {

    //Eu queria usar TypeScript para poder proteger o _commands, mas tive problemas depois de compilado, então fodase

    constructor() {
        this._commands = 0
    }

    getCommands() {
        return this._commands
    }
    setCommands(value) {
        this._commands += value
    }
    clearCommands(){
        this._commands = 0
    }
}