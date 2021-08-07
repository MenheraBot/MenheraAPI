import { Request, Response } from 'express';
import database from '../database/manager';

export default class StatsController {
  public static async postCommand(req: Request, res: Response): Promise<Response> {
    const { authorId, guildId, commandName, data, args } = req.body;
    if (!authorId || !guildId || !commandName || !data) {
      return res.sendStatus(400);
    }
    await database(authorId, guildId, commandName, data, args ?? '');
    return res.sendStatus(201);
  }
}
