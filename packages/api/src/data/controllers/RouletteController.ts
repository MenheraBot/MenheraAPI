import { Request, Response } from 'express';
import { createRouletteGame, getRouletteStatus } from '../database/DatabaseQueries';

export default class RouletteController {
  public static async postRouletteGame(req: Request, res: Response): Promise<Response> {
    const { userId, betValue, profit, didWin, betType, selectedValues } = req.body;
    if (
      !userId ||
      !betValue ||
      !profit ||
      typeof didWin === 'undefined' ||
      !betType ||
      !selectedValues
    )
      return res.sendStatus(400);
    await createRouletteGame(userId, betValue, profit, didWin, betType, selectedValues);

    return res.sendStatus(201);
  }

  public static async getUserRouletteStatus(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);

    const result = await getRouletteStatus(userId);

    if (!result) return res.sendStatus(404);

    const playedGames = (result.lost_games ?? 0) + (result.won_games ?? 0);

    if (playedGames === 0) return res.status(200).send({ error: true });
    const lostGames = result.lost_games;
    const winGames = result.won_games;
    const winMoney = result.earn_money;
    const lostMoney = result.lost_money;
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
}
