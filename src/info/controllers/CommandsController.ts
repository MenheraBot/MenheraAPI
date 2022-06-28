import { Request, Response } from 'express';
import CommandsManager from '../managers/CommandsManager';

export default class CommandsController {
  public static async getCommands(_req: Request, res: Response): Promise<Response> {
    const commands = CommandsManager.getInstance().getAllCommands();

    return res.json(commands);
  }

  public static createCommands(req: Request, res: Response): Response {
    const { commands } = req.body.data;

    if (!commands) return res.sendStatus(400);
    CommandsManager.getInstance().postCommands(commands);

    return res.sendStatus(200);
  }

  public static async editMaintenance(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const { disabled } = req.body.data;

    if (typeof name === 'undefined' || typeof disabled === 'undefined') return res.sendStatus(400);

    CommandsManager.getInstance().editMaintenance(name, disabled);

    return res.sendStatus(200);
  }

  public static async disabledCommands(_req: Request, res: Response): Promise<Response> {
    const commands = CommandsManager.getInstance().getDisabledCommands();

    return res.json(commands);
  }
}
