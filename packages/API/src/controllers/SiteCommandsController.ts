import { Request, Response } from 'express';
import variaveis from '../util/variables';

export default class SiteCommandsController {
  public static async getCommands(_req: Request, res: Response): Promise<Response> {
    const commands = variaveis.getExistingCommands();
    return res.status(200).send(commands);
  }

  public static async postExistingCommands(req: Request, res: Response): Promise<Response> {
    const { command } = req.body;
    variaveis.postExistingCommands(command);
    return res.sendStatus(201);
  }

  public static async clearExistingCommands(req: Request, res: Response): Promise<Response> {
    await variaveis.clearExistingCommands();
    return res.sendStatus(200);
  }
}
