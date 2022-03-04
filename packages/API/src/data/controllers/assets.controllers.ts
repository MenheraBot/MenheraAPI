import { Request, Response } from 'express';
import urls from '../util/assetsUrls';

export default class AssetsController {
  public static async getImageUrl(req: Request, res: Response): Promise<Response> {
    const { type } = req.params;

    if (!type) return res.sendStatus(400);

    const url = AssetsController.getAssetBasedOnTheType(type);

    if (url === 'NO-LINKS') return res.sendStatus(404);

    return res.json({ url });
  }

  private static getAssetBasedOnTheType(type: string): string {
    const allLinks = urls[type];

    if (!allLinks) return 'NO-LINKS';
    const randomLink = allLinks[Math.floor(Math.random() * allLinks.length)];

    return randomLink;
  }
}
