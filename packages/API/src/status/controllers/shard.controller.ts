import { Request, Response } from 'express';
import ShardStatus from '../managers/ShardStatusManager';

export default class ShardStatusController {
  public static async getShardStatus(_req: Request, res: Response): Promise<Response> {
    const shards = ShardStatus.getInstance().getAllShards();

    return res.json(shards);
  }

  public static updateShardStatus(req: Request, res: Response): Response {
    const { id } = req.params;
    const { memoryUsed, uptime, guilds, unavailable, ping, lastPingAt, members } = req.body.data;

    const data = {
      id: Number(id),
      memoryUsed,
      uptime,
      guilds,
      unavailable,
      ping,
      lastPingAt,
      members,
    };
    ShardStatus.getInstance().putShard(Number(id), data);

    return res.sendStatus(200);
  }
}
