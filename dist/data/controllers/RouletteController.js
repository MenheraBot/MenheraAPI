"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class RouletteController {
    static async postRouletteGame(req, res) {
        const { userId, betValue, profit, didWin, betType, selectedValues } = req.body;
        if (!userId ||
            !betValue ||
            !profit ||
            typeof didWin === 'undefined' ||
            !betType ||
            !selectedValues)
            return res.sendStatus(400);
        await (0, DatabaseQueries_1.createRouletteGame)(userId, betValue, profit, didWin, betType, selectedValues);
        return res.sendStatus(201);
    }
    static async getUserRouletteStatus(req, res) {
        const { userId } = req.body;
        if (!userId)
            return res.sendStatus(400);
        const result = await (0, DatabaseQueries_1.getRouletteStatus)(userId);
        if (!result)
            return res.sendStatus(404);
        const playedGames = result.lost_games + result.won_games;
        if (playedGames === 0)
            return res.status(200).send({ error: true });
        const lostGames = result.lost_games;
        const winGames = result.won_games;
        const winMoney = result.earn_money;
        const lostMoney = result.lost_money;
        const winPorcentage = ((winGames / playedGames) * 100).toFixed(2) || 0;
        const lostPorcentage = ((lostGames / playedGames) * 100).toFixed(2) || 0;
        const returnObject = {
            playedGames,
            lostGames,
            winGames,
            winMoney,
            lostMoney,
            winPorcentage,
            lostPorcentage,
        };
        return res.status(200).send(returnObject);
    }
    static async topRoulette(req, res) {
        const { skip, bannedUsers, type } = req.body;
        const top = await (0, DatabaseQueries_1.getTopRoulette)(skip, bannedUsers, type);
        return res.status(200).send(top);
    }
}
exports.default = RouletteController;
