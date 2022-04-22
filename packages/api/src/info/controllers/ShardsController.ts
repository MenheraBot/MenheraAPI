import { Request, Response } from 'express';
import ShardStatus from '../managers/ShardStatusManager';
import { IShardStatus } from '../utils/types';

export default class ShardStatusController {
  public static async getShardStatus(_req: Request, res: Response): Promise<Response> {
    const shards = ShardStatus.getInstance().getAllShards();

    return res.json(shards);
  }

  public static updateShardStatus(req: Request, res: Response): Response {
    const { shards } = req.body.data;

    shards.forEach((shard: IShardStatus) => {
      const {
        memoryUsed,
        uptime,
        guilds,
        unavailable,
        ping,
        lastPingAt,
        members,
        id,
        clusterId,
        connected,
      } = shard;
      const data = {
        id: Number(id),
        memoryUsed,
        uptime,
        guilds,
        unavailable,
        ping,
        lastPingAt,
        members,
        connected,
        clusterId,
      };
      ShardStatus.getInstance().putShard(Number(id), data);
    });

    return res.sendStatus(200);
  }
}
