import { Request, Response } from 'express';
import CommandExecutes from '../managers/CommandsExecuted';
import CommandsManager from '../managers/CommandsManager';

export default class CommandsController {
  public static async getCommands(_req: Request, res: Response): Promise<Response> {
    const commands = CommandsManager.getInstance().getAllCommands();

    return res.json(commands);
  }

  public static async getCommandsUsages(_req: Request, res: Response): Promise<Response> {
    return res.send(CommandExecutes.getInstance().getExecutedCommands());
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

  public static async clearExecutions(_: Request, res: Response): Promise<Response> {
    CommandExecutes.getInstance().clearCommandsUsage();
    return res.sendStatus(200);
  }
}
