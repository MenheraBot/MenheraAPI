import { CommandInteractionOption } from 'discord.js';
import { Request, Response } from 'express';
import database from '../database/manager';

export default class StatsController {
  private static resolveOptions(options: CommandInteractionOption[]): string {
    const returnValue = (opt: CommandInteractionOption): string => {
      if (opt.value) return `${opt.name}:${opt.value}`;
      if (opt.channel) return `${opt.name}:${opt.channel.id}`;
      if (opt.role) return `${opt.name}:${opt.role.id}`;
      if (opt.user) return `${opt.name}:${opt.user.id}`;
      if (opt.options) return opt.options.map(a => returnValue(a)).join('  ');
      return '';
    };
    return options.map(opt => returnValue(opt)).join(' ');
  }

  public static async postCommand(req: Request, res: Response): Promise<Response> {
    const { authorId, guildId, commandName, data, args } = req.body;
    if (!authorId || !guildId || !commandName || !data) {
      return res.sendStatus(400);
    }
    await database(
      authorId,
      guildId,
      commandName,
      data,
      args ? StatsController.resolveOptions(args) : ''
    );
    return res.sendStatus(201);
  }
}
