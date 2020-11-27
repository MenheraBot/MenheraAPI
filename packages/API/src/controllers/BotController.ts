import { Request, Response } from 'express';
import { status } from '../util/sendMessage';
import { Colors } from '../util/interfaces';

export default class BotController {
  public static async ready(_req: Request, res: Response): Promise<Response> {
    await status({
      title: 'Menhera is ON',
      description: 'Menhera voltou de férias, e já está online respondendo comandos!',
      color: Colors.Green,
      timestamp: new Date(),
    });
    return res.sendStatus(200);
  }

  public static async down(_req: Request, res: Response): Promise<Response> {
    await status({
      title: 'DOWN',
      description: 'ESSA NÃO!!!\nMenhera foi de base!',
      color: Colors.Red,
      timestamp: new Date(),
    });
    return res.sendStatus(200);
  }
}
