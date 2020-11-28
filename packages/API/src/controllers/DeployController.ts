import { Request, Response } from 'express';
import { exec } from 'child_process';
import path from 'path';
import { github } from '../util/sendMessage';

export default async (_req: Request, res: Response): Promise<void> => {
  try {
    const menheraPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'main');
    const command = `cd ${menheraPath}; git fetch; git pull origin master`;

    exec(command, error => {
      if (error) {
        console.log('[API SERVER ERROR]');
        res.send(`error: ${error.message}`).status(500);
        github(500, error.message);
        return;
      }
      res.sendStatus(200);
      github(200, 'Deploy finalizado com sucesso');
    });
  } catch (err) {
    console.log('[API SERVER ERROR]');
    res.sendStatus(500);
    github(500, err.message);
  }
};
