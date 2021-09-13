/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
import WatchClient from 'client';
import { Request, Response } from 'express';

export default class DefaultController {
  private client: WatchClient;

  constructor(client: WatchClient) {
    this.client = client;
  }

  public async ReceivedAction(req: Request, res: Response): Promise<Response | void> {
    if (req.body.type === 1) return res.status(200).json({ type: 1 });

    // @ts-ignore
    this.client.actions.InteractionCreate.handle(req.body);
  }
}
