import { Request, Response } from 'express';
import { getCoinflipStats, postCoinflip } from '../database/databaseUtils';

export default class CoinflipController {
  public static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);
    const result = await getCoinflipStats(userId);

    const playedGames = result.cf_wins + result.cf_loses;

    if (playedGames === 0) return res.status(200).send({ error: true });
    const lostGames = result.cf_loses;
    const winGames = result.cf_wins;
    const winMoney = result.cf_win_money;
    const lostMoney = result.cf_lose_money;
    const winPorcentage = winGames / playedGames;
    const lostPorcentage = lostGames / playedGames;
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

  public static async postCoinflip(req: Request, res: Response): Promise<Response> {
    const { winnerId, loserId, betValue, date } = req.body;

    if (!winnerId || !loserId || !betValue || !date) return res.sendStatus(400);

    const result = await postCoinflip(winnerId, loserId, betValue, date);

    if (!result) return res.sendStatus(500);
    return res.sendStatus(201);
  }
}
