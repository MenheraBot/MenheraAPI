import { Request, Response } from 'express';
import { makeUserWinBicho, registerBichoBet } from '../database/DatabaseQueries';

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
}
