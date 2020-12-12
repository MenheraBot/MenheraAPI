import { Request, Response } from 'express';

export default (req: Request, res: Response): Response =>
  res
    .status(404)
    .send("<h1 style='font-size:400%; color:red'><center>tem nada aqui meu parsa</center></h1>");
