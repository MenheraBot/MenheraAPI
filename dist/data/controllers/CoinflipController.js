"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class CoinflipController {
    static async getUserInfo(req, res) {
        const { userId } = req.body;
        if (!userId)
            return res.sendStatus(400);
        const result = await (0, DatabaseQueries_1.getCoinflipStats)(userId);
        if (!result)
            return res.sendStatus(400);
        const playedGames = result.cf_wins + result.cf_loses;
        if (playedGames === 0)
            return res.status(200).send({ error: true });
        const lostGames = result.cf_loses;
        const winGames = result.cf_wins;
        const winMoney = result.cf_win_money;
        const lostMoney = result.cf_lose_money;
        const winPorcentage = ((winGames ?? 0 / playedGames) * 100).toFixed(2) || 0;
        const lostPorcentage = ((lostGames ?? 0 / playedGames) * 100).toFixed(2) || 0;
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
    static async postCoinflip(req, res) {
        const { winnerId, loserId, betValue } = req.body;
        if (!winnerId || !loserId || !betValue)
            return res.sendStatus(400);
        await (0, DatabaseQueries_1.postCoinflip)(winnerId, loserId, betValue);
        return res.sendStatus(201);
    }
    static async topCoinflip(req, res) {
        const { skip, bannedUsers, type } = req.body;
        const top = await (0, DatabaseQueries_1.getTopCoinflip)(skip, bannedUsers, type);
        return res.status(200).send(top);
    }
}
exports.default = CoinflipController;
