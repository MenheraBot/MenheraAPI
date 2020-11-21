const Command = require("../../structures/command")
module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            ClientPermissions: ["MANAGE_MESSAGES"],
            category: "diversão",
        })
    }
    async run(message, args) {

        message.delete({timeout: 100}).catch()
        message.channel.send(args.join(" "))
       
    }
}