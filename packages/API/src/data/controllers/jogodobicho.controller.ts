import { Request, Response } from 'express';
import { makeUserWinBicho, registerBichoBet } from '../database/databaseUtils';
import { BichoBetType } from '../util/types';

export default class JogoDoBichoController {
  public static async addBet(req: Request, res: Response): Promise<Response> {
    const { userId, value, betType, betSelection } = req.body;
    const gameId = await JogoDoBichoController.registerBet(userId, value, betType, betSelection);

    return res.status(201).json({ gameId });
  }

  public static async userWin(req: Request, res: Response): Promise<Response> {
    const { gameId } = req.body;

    makeUserWinBicho(gameId);

    return res.sendStatus(200);
  }

  private static async registerBet(
    userId: string,
    value: number,
    betType: BichoBetType,
    betSelection: string
  ): Promise<number> {
    return registerBichoBet(userId, value, betType, betSelection);
  }
}
