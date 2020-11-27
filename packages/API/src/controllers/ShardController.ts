import { Request, Response } from 'express';
import { Colors } from '../util/interfaces';
import { status } from '../util/sendMessage';

export default class ShardController {
  public static async ready(req: Request, res: Response): Promise<Response> {
    const { shard } = req.body;
    await status({
      title: 'Shard On!',
      description: `O shard **${shard}** já está na batalha contra os Deuses`,
      color: Colors.Lavender,
      timestamp: new Date(),
    });
    return res.sendStatus(200);
  }

  public static async disconnect(req: Request, res: Response): Promise<Response> {
    const { shard } = req.body;
    await status({
      title: 'Quando você voltar, eu vou estar lá',
      description: `O shard **${shard}** foi de base`,
      color: Colors.Cascade,
      timestamp: new Date(),
    });
    return res.sendStatus(200);
  }

  public static async reconnecting(req: Request, res: Response): Promise<Response> {
    const { shard } = req.body;
    await status({
      title: 'Achou que eu tava brincando?',
      description: `O shard **${shard}** ta se recuperando dos danos, e voltando à batalha`,
      color: Colors.Cascade,
      timestamp: new Date(),
    });
    return res.sendStatus(200);
  }
}
