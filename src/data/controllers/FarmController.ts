/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { getFarmerData, registerFarmAction } from '../database/DatabaseQueries';

export default class FarmController {
  public static async postAction(req: Request, res: Response): Promise<Response> {
    const { userId, plant, action } = req.body;
    if (!userId || typeof plant === 'undefined' || !action) {
      return res.sendStatus(400);
    }

    await registerFarmAction(userId, plant, action);

    return res.sendStatus(201);
  }

  public static async getFarmerData(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query;

    if (typeof userId !== 'string') return res.sendStatus(400);

    const data = await getFarmerData(userId);

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }
}
