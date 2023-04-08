import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers;

  if (!authorization || authorization !== process.env.API_TOKEN) {
    return res.status(403).send({ message: 'Only the Menhera Client can access that!' });
  }

  return next();
};
