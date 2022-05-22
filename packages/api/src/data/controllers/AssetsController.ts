import { Request, Response } from 'express';
import CdnManager, { AssetsLimit } from '../util/CdnManager';

export default class AssetsController {
  public static async getImageUrl(req: Request, res: Response): Promise<Response> {
    const type = req.params.type as keyof AssetsLimit;

    if (!type) return res.sendStatus(400);

    const url = CdnManager.getInstance().getLink(type);

    if (url === 'NO-LINKS') return res.sendStatus(404);

    return res.json({ url });
  }
}
