"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class HuntsController {
    static async getUserInfo(req, res) {
        const { userId } = req.body;
        if (!userId)
            return res.sendStatus(400);
        const result = await (0, DatabaseQueries_1.getUserHuntData)(userId);
        if (!result || !result.user_id)
            return res.status(200).send({ error: true });
        return res.status(200).json(result);
    }
    static async postHuntMade(req, res) {
        const { userId, huntType, value, success, tries } = req.body;
        if (!userId)
            return res.sendStatus(400);
        await (0, DatabaseQueries_1.postHunt)(userId, huntType, value, success, tries);
        return res.sendStatus(201);
    }
    static async topHunts(req, res) {
        const { skip, bannedUsers, type, huntType } = req.body;
        const top = await (0, DatabaseQueries_1.getTopHunt)(skip, bannedUsers, huntType, type);
        return res.status(200).send(top);
    }
}
exports.default = HuntsController;
