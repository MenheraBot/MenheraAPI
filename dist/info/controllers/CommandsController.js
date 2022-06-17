"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandsManager_1 = __importDefault(require("../managers/CommandsManager"));
class CommandsController {
    static async getCommands(_req, res) {
        const commands = CommandsManager_1.default.getInstance().getAllCommands();
        return res.json(commands);
    }
    static createCommands(req, res) {
        const { commands } = req.body.data;
        if (!commands)
            return res.sendStatus(400);
        CommandsManager_1.default.getInstance().postCommands(commands);
        return res.sendStatus(200);
    }
    static async editMaintenance(req, res) {
        const { name } = req.params;
        const { disabled } = req.body.data;
        if (typeof name === 'undefined' || typeof disabled === 'undefined')
            return res.sendStatus(400);
        CommandsManager_1.default.getInstance().editMaintenance(name, disabled);
        return res.sendStatus(200);
    }
}
exports.default = CommandsController;
