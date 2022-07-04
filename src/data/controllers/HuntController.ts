import { Request, Response } from 'express';
import { getTopHunt, getUserHuntData, postHunt } from '../database/DatabaseQueries';

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

  public static async topHunts(req: Request, res: Response): Promise<Response> {
    const { skip, bannedUsers, type, huntType } = req.body;

    const top = await getTopHunt(skip, bannedUsers, huntType, type);

    return res.status(200).send(top);
  }

  public static async weeklyHunters(_req: Request, res: Response): Promise<Response> {
    return res.sendStatus(418);
    // TODO
  }
}
