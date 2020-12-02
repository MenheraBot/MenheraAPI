import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const { password, username } = req.headers;

  if (username !== process.env.ROOT_USERNAME || password !== process.env.ROOT_PASSWORD) {
    return res.status(401).send({ message: 'Only the Menhera Client can access that!' });
  }

  return next();
};
