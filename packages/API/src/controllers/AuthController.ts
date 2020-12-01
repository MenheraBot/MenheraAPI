import { Request, Response } from 'express';

export default class AuthController {
  public static check(_req: Request, res: Response): Response {
    return res.sendStatus(2000);
  }
}
