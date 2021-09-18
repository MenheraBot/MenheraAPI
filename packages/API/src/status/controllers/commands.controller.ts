import { Request, Response } from 'express';
import CommandsManager from '../managers/CommandsManager';

export default class CommandsController {
  public static async getCommands(_req: Request, res: Response): Promise<Response> {
    const commands = CommandsManager.getInstance().getAllCommands();

    return res.json(commands);
  }

  public static createCommand(req: Request, res: Response): Response {
    const { name, category, cooldown, description, options, disabled } = req.body;

    if (
      typeof name === 'undefined' ||
      typeof category === 'undefined' ||
      typeof cooldown === 'undefined' ||
      typeof description === 'undefined' ||
      typeof options === 'undefined' ||
      typeof disabled === 'undefined'
    )
      return res.sendStatus(400);

    const data = {
      name,
      category,
      cooldown,
      description,
      options,
      disabled,
    };
    CommandsManager.getInstance().putCommand(name, data);

    return res.sendStatus(200);
  }

  public static async editMaintenance(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const { disabled } = req.body;

    if (typeof name === 'undefined' || typeof disabled === 'undefined') return res.sendStatus(400);

    CommandsManager.getInstance().editMaintenance(name, disabled);

    return res.sendStatus(200);
  }
}
