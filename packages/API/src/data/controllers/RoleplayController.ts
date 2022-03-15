/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';
import RoleplayBattleConfigs from '../util/RoleplayConfigs';

export default class RoleplayController {
  public static async getConfig(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query;

    if (!userId) return res.sendStatus(400);

    const config = RoleplayBattleConfigs.find(a => a.userId === userId);

    if (!config) return res.sendStatus(404);

    return res.status(200).json({ config: config.config });
  }

  public static async setConfig(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query;
    const { config } = req.body;

    if (!config || !userId) return res.sendStatus(400);

    const found = RoleplayBattleConfigs.find(a => a.userId === userId);

    console.log(found);

    if (found) {
      for (const att in config) {
        found.config[att] = config[att];
      }
    } else {
      RoleplayBattleConfigs.push({ userId: userId as string, config });
    }

    return res.sendStatus(201);
  }
}
