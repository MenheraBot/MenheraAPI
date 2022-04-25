import { Request, Response } from 'express';
import {
  getBichoStats,
  getTopBicho,
  makeUserWinBicho,
  registerBichoBet,
  updateUserBichoStatus,
} from '../database/DatabaseQueries';

export default class JogoDoBichoController {
  public static async addBet(req: Request, res: Response): Promise<Response> {
    const { userId, value, betType, betSelection } = req.body;
    const gameId = await registerBichoBet(userId, value, betType, betSelection);

    return res.status(201).json({ gameId });
  }

  public static async userWin(req: Request, res: Response): Promise<Response> {
    const { gameId } = req.body;

    makeUserWinBicho(gameId);

    return res.sendStatus(200);
  }

  public static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;

    if (!userId) return res.sendStatus(400);

    const result = await getBichoStats(userId);

    if (!result) return res.sendStatus(400);

    const [wonGames, loseGames] = result;

    const playedGames = wonGames.length + loseGames.length;

    if (playedGames === 0) return res.status(200).send({ error: true });

    const lostGames = loseGames.length;
    const winGames = wonGames.length;
    const winPorcentage = ((winGames / playedGames) * 100).toFixed(2) || 0;
    const lostPorcentage = ((lostGames / playedGames) * 100).toFixed(2) || 0;
    const returnObject = {
      playedGames,
      lostGames,
      winGames,
      wonGames,
      loseGames,
      winPorcentage,
      lostPorcentage,
    };

    return res.status(200).send(returnObject);
  }

  public static async postBichoGame(req: Request, res: Response): Promise<Response> {
    const { userId, betValue, profit, didWin } = req.body;
    if (!userId || !betValue || !profit || typeof didWin === 'undefined')
      return res.sendStatus(400);

    await updateUserBichoStatus(userId, betValue, profit, didWin);

    return res.sendStatus(201);
  }

  public static async topBicho(req: Request, res: Response): Promise<Response> {
    const { skip, bannedUsers, type } = req.body;

    const top = await getTopBicho(skip, bannedUsers, type);

    return res.status(200).send(top);
  }
}
