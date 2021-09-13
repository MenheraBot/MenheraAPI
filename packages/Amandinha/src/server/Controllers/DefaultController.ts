/* eslint-disable consistent-return */
import { Request, Response } from 'express';

export default class DefaultController {
  public static async ReceivedAction(req: Request, res: Response): Promise<Response | void> {
    if (req.body.type === 1) return res.status(200).json({ type: 1 });
  }
}
