import { Request, Response } from 'express';
import MenheraStats from '../util/variables';
import APIError from '../util/APIError';

export default class StatsController {
  public static async getCommands(req: Request, res: Response): Promise<Response> {
    const comandos = MenheraStats.getCommands();
    if (req.query.cmds === 'true') return res.json({ lenght: comandos.lenght });

    return res.json({ lenght: comandos.lenght, commands: comandos.commands });
  }

  public static async postCommand(req: Request, res: Response): Promise<Response> {
    try {
      const {
        authorName, authorId, guildName, guildId, commandName, data,
      } = req.body;

      if (!authorName || !authorId || !guildName || !guildId || !commandName || !data) throw new APIError('O request é inválido', 400);

      MenheraStats.setCommands(authorName, authorId, guildName, guildId, commandName, data);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  }

  public static async clearCommands(req: Request, res: Response): Promise<Response> {
    MenheraStats.clearCommands();
    return res.sendStatus(200);
  }
}
