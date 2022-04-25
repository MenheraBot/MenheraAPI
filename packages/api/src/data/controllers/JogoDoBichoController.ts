import { Request, Response } from 'express';
import { getBichoStats, makeUserWinBicho, registerBichoBet } from '../database/DatabaseQueries';

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
}
