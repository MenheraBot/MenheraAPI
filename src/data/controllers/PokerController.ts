import { Request, Response } from 'express';
import { getPokerData, updateUserPokerStatus } from '../database/DatabaseQueries';

export default class PokerController {
  public static async postPokerRound(req: Request, res: Response): Promise<Response> {
    const { players } = req.body;

    if (typeof players === 'undefined' || !Array.isArray(players)) return res.sendStatus(400);

    players.forEach(a => updateUserPokerStatus(a.id, a.chips, a.won, a.reason));

    return res.sendStatus(201);
  }

  public static async getUserPokerStatus(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query;

    if (typeof userId !== 'string') return res.sendStatus(400);

    const result = await getPokerData(userId);

    if (!result) return res.sendStatus(404);

    const playedGames = result.lost_games + result.won_games;

    if (playedGames === 0) return res.sendStatus(404);

    const lostGames = result.lost_games;
    const winGames = result.won_games;
    const winMoney = result.earn_money;
    const lostMoney = result.lost_money;
    const winPorcentage = ((winGames / playedGames) * 100).toFixed(2) || 0;
    const lostPorcentage = ((lostGames / playedGames) * 100).toFixed(2) || 0;

    const returnObject = {
      ...result,
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
}
