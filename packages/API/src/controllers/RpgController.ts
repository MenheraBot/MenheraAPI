import { Request, Response } from 'express';
import { postRpgResult } from '../database/databaseUtils'

export default class RpgController {
  public static async postBattle(req: Request, res: Response): Promise<Response> {
    const {userId, userClass, userLevel, dungeonLevel, death} = req.body;

    if (!userId || !userClass || !userLevel || !dungeonLevel || !death) return res.sendStatus(400);

    await postRpgResult(userId, userClass, userLevel, dungeonLevel, death);

    return res.sendStatus(201);
  }
}
