/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import { getFarmerData, getTopFarmer, registerFarmActions } from '../database/DatabaseQueries';

export default class FarmController {
  public static async postAction(req: Request, res: Response): Promise<Response> {
    const { userId, plant, action } = req.body;
    if (!userId || typeof plant === 'undefined' || (action !== 'HARVEST' && action !== 'ROTTED'))
      return res.sendStatus(400);

    try {
      await registerFarmActions(
        userId,
        plant,
        action === 'HARVEST' ? { harvest: 1 } : { rotted: 1 }
      );
      return res.sendStatus(201);
    } catch {
      return res.sendStatus(500);
    }
  }

  public static async postMultipleHarvest(req: Request, res: Response): Promise<Response> {
    const { userId, plants } = req.body;
    if (!userId || typeof plants === 'undefined') {
      return res.sendStatus(400);
    }

    const counts = plants.reduce(
      (
        p: Record<number, { harvest: number; rotted: number }>,
        c: { plant: number; weight: number }
      ) => {
        if (!p[c.plant]) p[c.plant] = { harvest: 0, rotted: 0 };

        if (c.weight > 0) p[c.plant].harvest += 1;
        else p[c.plant].rotted += 1;

        return p;
      },
      {}
    );

    // @ts-expect-error Not typed
    for (const [plant, { harvest, rotted }] of Object.entries(counts)) {
      await registerFarmActions(userId, Number(plant), { harvest, rotted });
    }

    return res.sendStatus(201);
  }

  public static async getFarmerData(req: Request, res: Response): Promise<Response> {
    const { userId } = req.query;

    if (typeof userId !== 'string') return res.sendStatus(400);

    const data = await getFarmerData(userId);

    if (!data) return res.sendStatus(404);

    return res.status(200).send(data);
  }

  public static async topFarmer(req: Request, res: Response): Promise<Response> {
    const { skip, bannedUsers, plantType, orderBy } = req.body;

    const top = await getTopFarmer(skip, bannedUsers, plantType, orderBy);

    return res.status(200).send(top);
  }
}
