import { Request, Response } from 'express';
import { postRpgResult } from '../database/databaseUtils';

export default class RpgController {
  public static async postBattle(req: Request, res: Response): Promise<Response> {
    const { userId, userClass, userLevel, dungeonLevel, death, date } = req.body;

    await postRpgResult(userId, userClass, userLevel, dungeonLevel, death, date);

    return res.sendStatus(201);
  }
}
