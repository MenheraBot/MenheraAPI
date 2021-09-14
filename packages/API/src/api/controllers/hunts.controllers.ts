import { Request, Response } from 'express';
import { getUserHuntData, postHunt } from '../database/databaseUtils';

export default class HuntsController {
  public static async getUserInfo(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) return res.sendStatus(400);
    const result = await getUserHuntData(userId);

    if (!result || !result.user_id) return res.status(200).send({ error: true });

    return res.status(200).json(result);
  }

  public static async postHuntMade(req: Request, res: Response): Promise<Response> {
    const { userId, huntType, value, success, tries } = req.body;

    if (!userId) return res.sendStatus(400);

    await postHunt(userId, huntType, value, success, tries);
    return res.sendStatus(201);
  }
}
