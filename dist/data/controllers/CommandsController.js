"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class StatsController {
    static resolveOptions(options) {
        const returnValue = (opt) => {
            if (opt.value)
                return `${opt.name}:${opt.value}`;
            if (opt.channel)
                return `${opt.name}:${opt.channel.id}`;
            if (opt.role)
                return `${opt.name}:${opt.role.id}`;
            if (opt.user)
                return `${opt.name}:${opt.user.id}`;
            if (opt.options)
                return opt.options.map(a => returnValue(a)).join('  ');
            return '';
        };
        return options.map(opt => returnValue(opt)).join(' ');
    }
    static async postCommand(req, res) {
        const { authorId, guildId, commandName, data, args } = req.body;
        if (!authorId || !guildId || !commandName || !data) {
            return res.sendStatus(400);
        }
        await (0, DatabaseQueries_1.createCommandExecution)(authorId, guildId, commandName, data, args ? StatsController.resolveOptions(args) : '');
        return res.sendStatus(201);
    }
}
exports.default = StatsController;
