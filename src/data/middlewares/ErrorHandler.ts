import { Request, Response, NextFunction } from 'express';

export default (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!error) return next();

  console.error(new Date().toISOString(), error.message);

  return res.status(500).send({ message: 'An error occurred trying to process your request' });
};
