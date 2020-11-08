const Command = require("../../structures/command")
module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            category: "dev",
            ClientPermissions: ["MANAGE_MESSAGES"],
            OnlyDevs: true
        })
    }
    
    async run(message, args) {
    // test.run(this.client)
    }
}