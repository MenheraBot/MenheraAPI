import { Request, Response } from 'express';

export default class AuthController {
  public static check(req: Request, res: Response): Response {
    const { username, password } = req.headers;
    if (
      !username ||
      username !== process.env.API_USER ||
      !password ||
      password !== process.env.API_PASS
    )
      return res.sendStatus(401);
    return res.sendStatus(200);
  }
}
