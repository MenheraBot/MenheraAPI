import { Request, Response } from 'express';
import {
  getBichoHistory,
  getBichoStats,
  getTopBicho,
  registerBichoGame,
  updateUserBichoStatus,
} from '../database/DatabaseQueries';
import { BichoGamePlayer } from '../util/types';

export default class JogoDoBichoController {
  public static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;

    if (!userId) return res.sendStatus(400);

    const result = await getBichoStats(userId);

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

  public static async getBichoGames(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;

    const numberPage = Number(page);

    if (!numberPage || Number.isNaN(numberPage))
      return res.status(400).json({ message: 'You need to specify the "page" in query' });

    if (numberPage < 1) return res.status(422).json({ message: 'The page must be grather than 0' });

    if (numberPage >= 100)
      return res.status(422).json({ message: 'The page must be less than 100' });

    const results = await getBichoHistory(numberPage);

    return res.status(200).json(results);
  }

  public static async postBichoGame(req: Request, res: Response): Promise<Response> {
    const {
      players,
      date,
      results,
    }: { players: BichoGamePlayer[]; date: number; results: string } = req.body;

    if (!players || !date || !results) return res.sendStatus(400);

    players.forEach(a => {
      updateUserBichoStatus(a.id, a.bet, a.profit, a.didWin);
    });

    await registerBichoGame(players, date, results);

    return res.sendStatus(201);
  }

  public static async topBicho(req: Request, res: Response): Promise<Response> {
    const { skip, bannedUsers, type } = req.body;

    const top = await getTopBicho(skip, bannedUsers, type);

    return res.status(200).send(top);
  }
}
