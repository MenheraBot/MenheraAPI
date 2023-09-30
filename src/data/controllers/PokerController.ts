import { Request, Response } from 'express';
import { updateUserPokerStatus } from '../database/DatabaseQueries';

export default class PokerController {
  public static async postPokerRound(req: Request, res: Response): Promise<Response> {
    const { players } = req.body;

    if (typeof players === 'undefined' || !Array.isArray(players)) return res.sendStatus(400);

    players.forEach(a => updateUserPokerStatus(a.id, a.chips, a.won, a.reason));

    return res.sendStatus(201);
  }
}
