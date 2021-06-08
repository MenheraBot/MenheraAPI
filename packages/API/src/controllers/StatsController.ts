import { Request, Response } from 'express';
import APIError from '../util/APIError';
import database from '../database/manager';

export default class StatsController {
  public static async postCommand(req: Request, res: Response): Promise<Response> {
    const { authorName, authorId, guildName, guildId, commandName, data, args } = req.body;
    if (!authorName || !authorId || !guildName || !guildId || !commandName || !data)
      throw new APIError('O request é inválido', 400);
    await database(authorId, guildId, commandName, data, args);
    return res.sendStatus(201);
  }
}
