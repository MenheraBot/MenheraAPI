import { Request, Response } from 'express';
import {
  getRouletteStatus,
  getTopRoulette,
  updateUserRouletteStatus,
} from '../database/DatabaseQueries';

export default class RouletteController {
  public static async postRouletteGame(req: Request, res: Response): Promise<Response> {
    const { userId, betValue, profit, didWin } = req.body;
    if (!userId || !betValue || !profit || typeof didWin === 'undefined')
      return res.sendStatus(400);
    await updateUserRouletteStatus(userId, betValue, profit, didWin);

    return res.sendStatus(201);
  }

  public static async getUserRouletteStatus(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);

    const result = await getRouletteStatus(userId);

    if (!result) return res.sendStatus(404);

    const playedGames = result.lost_games + result.won_games;

    if (playedGames === 0) return res.status(200).send({ error: true });
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

  public static async topRoulette(req: Request, res: Response): Promise<Response> {
    const { skip, bannedUsers, type } = req.body;

    const top = await getTopRoulette(skip, bannedUsers, type);

    return res.status(200).send(top);
  }
}
