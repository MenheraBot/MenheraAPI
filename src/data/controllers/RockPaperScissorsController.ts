import { Request, Response } from 'express';
import {
  createTransaction,
  getRockPaperScissorsData,
  registerRockPaperScissorsGame,
} from '../database/DatabaseQueries';

export default class RockPaperScissorsController {
  public static async postRockPaperScissorsGame(req: Request, res: Response): Promise<Response> {
    const { users, draw, bet } = req.body;

    if (typeof bet === 'undefined' || !Array.isArray(users) || typeof draw === 'undefined')
      return res.sendStatus(400);

    if (bet > 0 && !draw)
      createTransaction(
        users.find(a => !a.won).id,
        users.find(a => a.won).id,
        bet,
        'estrelinhas',
        'rps_command'
      );

    let winner = users.find(u => u.won);
    let loser;

    if (!winner) [winner, loser] = users;
    else loser = users.find(u => !u.won);

    await registerRockPaperScissorsGame(
      winner.id,
      loser.id,
      winner.selected,
      loser.selected,
      draw,
      bet
    );

    return res.sendStatus(201);
  }

  public static async getUserRockPaperScissorsGames(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { userId } = req.query;

    if (typeof userId !== 'string') return res.sendStatus(400);

    const result = await getRockPaperScissorsData(userId);

    if (!result) return res.sendStatus(404);

    const playedGames = result.total_games;

    if (playedGames === 0) return res.sendStatus(404);

    const lostGames = result.lost_games;
    const winGames = result.won_games;
    const drawGames = result.total_games - (result.won_games + result.lost_games);

    const winMoney = result.earn_money;
    const lostMoney = result.lost_money;
    const winPorcentage = ((winGames / playedGames) * 100).toFixed(2) || 0;
    const lostPorcentage = ((lostGames / playedGames) * 100).toFixed(2) || 0;
    const drawPorcentage = ((drawGames / playedGames) * 100).toFixed(2) || 0;

    const returnObject = {
      drawGames,
      lostGames,
      winGames,
      winMoney,
      lostMoney,
      winPorcentage,
      lostPorcentage,
      drawPorcentage,
      rock: result.rock,
      paper: result.paper,
      scissors: result.scissors,
    };

    return res.status(200).send(returnObject);
  }
}
