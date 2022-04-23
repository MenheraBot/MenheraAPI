import { Request, Response } from 'express';
import { getCoinflipStats, postCoinflip } from '../database/DatabaseQueries';

export default class CoinflipController {
  public static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);
    const result = await getCoinflipStats(userId);

    if (!result) return res.sendStatus(400);

    const playedGames = (result.cf_wins ?? 0) + (result.cf_loses ?? 0);

    if (playedGames === 0) return res.status(200).send({ error: true });
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

  public static async postCoinflip(req: Request, res: Response): Promise<Response> {
    const { winnerId, loserId, betValue } = req.body;

    if (!winnerId || !loserId || !betValue) return res.sendStatus(400);

    await postCoinflip(winnerId, loserId, betValue);

    return res.sendStatus(201);
  }
}
