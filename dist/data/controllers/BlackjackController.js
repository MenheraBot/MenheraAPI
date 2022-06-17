"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class BlackJackController {
    static async getUserInfo(req, res) {
        const { userId } = req.body;
        if (!userId)
            return res.sendStatus(400);
        const result = await (0, DatabaseQueries_1.getBlackJackStats)(userId);
        if (!result)
            return res.sendStatus(400);
        const playedGames = result.bj_wins + result.bj_loses;
        if (playedGames === 0)
            return res.status(200).send({ error: true });
        const lostGames = result.bj_loses;
        const winGames = result.bj_wins;
        const winMoney = result.bj_win_money;
        const lostMoney = result.bj_lose_money;
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
    static async postBlackJack(req, res) {
        const { userId, betValue, didWin } = req.body;
        if (!userId || !betValue || didWin === undefined)
            return res.sendStatus(400);
        await (0, DatabaseQueries_1.postBlackJackGame)(userId, didWin, betValue);
        return res.sendStatus(201);
    }
    static async topBlackjack(req, res) {
        const { skip, bannedUsers, type } = req.body;
        const top = await (0, DatabaseQueries_1.getTopBlackjack)(skip, bannedUsers, type);
        return res.status(200).send(top);
    }
}
exports.default = BlackJackController;
