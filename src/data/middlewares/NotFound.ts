import { Request, Response } from 'express';

export default (_req: Request, res: Response): Response =>
  res.status(404).send({ message: 'Nothing here for you, brother' });
