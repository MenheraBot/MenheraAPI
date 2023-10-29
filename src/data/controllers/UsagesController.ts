/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import {
  getInactiveUsersLastCommand,
  getTopCommands,
  getTopUsers,
  getUserAllBans,
  getUserProfileData,
  getUserLastBanDate,
  getTopCommandsFromUser,
} from '../database/DatabaseQueries';

export default class UsagesController {
  static async getInactiveUsers(req: Request, res: Response): Promise<Response> {
    const data = await getInactiveUsersLastCommand(req.body);

    return res.status(200).json(data);
  }

  static async getUserBans(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) return res.sendStatus(400);

    const data = await getUserAllBans(id);

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }

  static async getUserLastBanTime(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) return res.sendStatus(400);

    const data = await getUserLastBanDate(id);

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }

  static async topUsers(_req: Request, res: Response): Promise<Response> {
    const rows = await getTopUsers();
    return res.status(200).send(rows);
  }

  static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query;

    if (typeof userId !== 'string') return res.sendStatus(400);

    const fromDb = await getUserProfileData(userId);

    if (!fromDb) return res.sendStatus(404);

    return res.status(200).json(fromDb);
  }

  static async topCommands(req: Request, res: Response): Promise<Response> {
    const { skip = 0, userId } = req.query;

    const result =
      typeof userId === 'string'
        ? await getTopCommandsFromUser(Number(skip), userId)
        : await getTopCommands(Number(skip));

    return res.status(200).json(result);
  }
}
