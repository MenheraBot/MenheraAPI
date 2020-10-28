const { Client, Collection } = require("discord.js")
const { readdir } = require("fs-extra")
const EventManager = require("./structures/EventManager")
const Server = require('../menhera-API/server')

module.exports = class WatchClient extends Client {
    constructor(options = {}) {
        super(options)

        this.database = require("./structures/DatabaseConnection")
        this.commands = new Collection()
        this.aliases = new Collection()
        this.events = new EventManager(this)
        this.config = require("../config.json")
    }
    reloadCommand(commandName) {
        const command = this.commands.get(commandName) || this.commands.get(this.aliases.get(commandName))
        if (!command) return false
        const dir = command.dir
        this.commands.delete(command.name)
        delete require.cache[require.resolve(`${dir}`)]
        try {
            const Command = require(`${dir}`)
            const cmd = new Command(this)
            cmd.dir = dir
            this.commands.set(cmd.name, cmd)
            return true
        } catch (e) {
            return e
        }
    }
    reloadEvent(eventName) {
        const event = this.events.events.includes(eventName)
        if (!event) return false

        const dir = `./events/${eventName}.js`
        const status = this.events.remove(eventName)
        if (!status) return status
        delete require.cache[require.resolve(`${dir}`)]
        try {
            const Event = require(`${dir}`)
            const event = new Event(this)
            this.events.add(eventName, event)
            return true
        } catch (e) {
            return e
        }
    }
    login(token) {
        return super.login(token)
    }

    startServer(){
        require('../menhera-API/server')
    }

    loadCommands(path) {
        readdir(`${__dirname}/commands/`, (err, files) => {
            if (err) console.error(err)
            files.forEach(category => {
                readdir(`${__dirname}/commands/${category}`, (err, cmd) => {
                    cmd.forEach(async cmd => {
                        const command = new (require(`${__dirname}/commands/${category}/${cmd}`))(this)
                        command.dir = `${__dirname}/commands/${category}/${cmd}`
                        this.commands.set(command.config.name, command)
                        command.config.aliases.forEach(a => this.aliases.set(a, command.config.name))
                    })
                })
            })
        })
        return this
    }
    loadEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.error(err)

            files.forEach(em => {
                const event = new (require(`../${path}/${em}`))(this)
                this.events.add(em.split(".")[0], event)
            })
        })
        return this
    }
}