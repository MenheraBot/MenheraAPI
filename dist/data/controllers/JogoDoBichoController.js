"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseQueries_1 = require("../database/DatabaseQueries");
class JogoDoBichoController {
    static async getUserInfo(req, res) {
        const { userId } = req.body;
        if (!userId)
            return res.sendStatus(400);
        const result = await (0, DatabaseQueries_1.getBichoStats)(userId);
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
    static async postBichoGame(req, res) {
        const players = req.body.players;
        if (!players)
            return res.sendStatus(400);
        players.forEach(a => {
            (0, DatabaseQueries_1.updateUserBichoStatus)(a.id, a.bet, a.profit, a.didWin);
        });
        return res.sendStatus(201);
    }
    static async topBicho(req, res) {
        const { skip, bannedUsers, type } = req.body;
        const top = await (0, DatabaseQueries_1.getTopBicho)(skip, bannedUsers, type);
        return res.status(200).send(top);
    }
}
exports.default = JogoDoBichoController;
