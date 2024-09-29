import { Request, Response, NextFunction } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction): Response | void => {
  if (!error) return next();

  console.error(`${new Date().toISOString()} [${req.method} ${req.url}]`, error.message);

  return res.status(500).send({ message: 'An error occurred trying to process your request' });
};
