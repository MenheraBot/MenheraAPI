/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import WatchClient from '../../client';

export default class DefaultController {
  public static async ReceivedAction(
    req: Request,
    res: Response,
    client: WatchClient
  ): Promise<Response | void> {
    if (req.body.type === 1) return res.status(200).json({ type: 1 });

    // @ts-ignore
    client.actions.InteractionCreate.handle(req.body);
  }
}
