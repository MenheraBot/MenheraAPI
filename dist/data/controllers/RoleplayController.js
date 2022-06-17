"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleplayConfigs_1 = __importDefault(require("../util/RoleplayConfigs"));
class RoleplayController {
    static async getConfig(req, res) {
        const { userId } = req.query;
        if (!userId)
            return res.sendStatus(400);
        const config = RoleplayConfigs_1.default.find(a => a.userId === userId);
        if (!config)
            return res.sendStatus(202);
        return res.status(200).json({ config: config.config });
    }
    static async setConfig(req, res) {
        const { userId } = req.query;
        const { config } = req.body;
        if (!config || !userId)
            return res.sendStatus(400);
        const found = RoleplayConfigs_1.default.find(a => a.userId === userId);
        if (found) {
            for (const att in config) {
                found.config[att] = config[att];
            }
        }
        else {
            RoleplayConfigs_1.default.push({ userId: userId, config });
        }
        return res.sendStatus(201);
    }
}
exports.default = RoleplayController;
