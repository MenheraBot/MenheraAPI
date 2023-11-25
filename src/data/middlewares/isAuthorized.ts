import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ message: 'Hoy! You need to be authenticated to access this ' });

  if (authorization !== process.env.API_TOKEN)
    return res.status(403).json({ message: 'Only Menhera itself can enter her room. GET OUT!' });

  return next();
};
