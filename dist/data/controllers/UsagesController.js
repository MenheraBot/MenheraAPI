"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class UsagesController {
    static async getInactiveUsers(req, res) {
        const data = await (0, DatabaseQueries_1.getInactiveUsersLastCommand)(req.body);
        return res.status(200).json(data);
    }
    static async topUsers(_req, res) {
        const rows = await (0, DatabaseQueries_1.getTopUsers)();
        return res.status(200).send(rows);
    }
    static async getUserInfo(req, res) {
        const { userId } = req.body;
        const commandsExecuted = await (0, DatabaseQueries_1.getUserCommandsUsesCount)(userId);
        if (!commandsExecuted)
            return res.status(404).send('Este usuário não exsite em meu banco de dados');
        const allCommands = await (0, DatabaseQueries_1.getUserTopCommandsUsed)(userId);
        return res.send({ cmds: commandsExecuted, array: allCommands });
    }
    static async topCommands(_req, res) {
        const rows = await (0, DatabaseQueries_1.getTopCommands)();
        return res.status(200).send(rows);
    }
}
exports.default = UsagesController;
