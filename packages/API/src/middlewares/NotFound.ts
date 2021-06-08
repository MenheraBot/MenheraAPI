import { Request, Response } from 'express';

export default (_req: Request, res: Response): Response =>
  res
    .status(404)
    .send({ message: 'Eu não sei o que tu procuras, mas certamente não está aqui...' });
