/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import {
  getInactiveUsersLastCommand,
  getTopCommands,
  getTopUsers,
  getUserCommandsUsesCount,
  getUserLastBanDate,
  getUserTopCommandsUsed,
} from '../database/DatabaseQueries';

export default class UsagesController {
  static async getInactiveUsers(req: Request, res: Response): Promise<Response> {
    const data = await getInactiveUsersLastCommand(req.body);

    return res.status(200).json(data);
  }

  static async getUserBanData(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    if (!userId) return res.sendStatus(400);

    const data = await getUserLastBanDate(userId);

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }

  static async topUsers(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopUsers();
    return res.status(200).send(rows);
  }

  static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    const commandsExecuted = await getUserCommandsUsesCount(userId);

    if (!commandsExecuted)
      return res.status(404).send('Este usuário não exsite em meu banco de dados');

    const allCommands = await getUserTopCommandsUsed(userId);

    return res.send({ cmds: commandsExecuted, array: allCommands });
  }

  static async topCommands(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopCommands();
    return res.status(200).send(rows);
  }
}
