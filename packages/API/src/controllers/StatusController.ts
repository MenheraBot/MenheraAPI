import { Request, Response } from 'express';

export default class StatusController {
  public static async status(req: Request, res: Response): Promise<Response> {
    console.log(req.body.maintenance.maintenance_updates);

    return res.sendStatus(201);
  }
}
