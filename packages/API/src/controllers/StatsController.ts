import { Request, Response } from 'express';
import MenheraStats from '../util/variables';
import APIError from '../util/APIError';
import database from '../database/manager';

export default class StatsController {
  public static async getCommands(req: Request, res: Response): Promise<Response> {
    const comandos = MenheraStats.getCommands();
    if (req.query.cmds === 'true') return res.json({ length: comandos.length });

    return res.json({ length: comandos.length, commands: comandos.commands });
  }

  public static async postCommand(req: Request, res: Response): Promise<Response> {
    const { authorName, authorId, guildName, guildId, commandName, data } = req.body;

    if (!authorName || !authorId || !guildName || !guildId || !commandName || !data)
      throw new APIError('O request é inválido', 400);

    MenheraStats.setCommands(authorName, authorId, guildName, guildId, commandName, data);
    await database(authorId, guildId, commandName, data);
    return res.sendStatus(200);
  }

  public static async clearCommands(req: Request, res: Response): Promise<Response> {
    MenheraStats.clearCommands();
    return res.sendStatus(200);
  }
}
