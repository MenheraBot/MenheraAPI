import { Request, Response } from 'express';
import { exec } from 'child_process';
import path from 'path';
import logger from '@menhera-tools/logger';
import { github } from '../util/sendMessage';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const menheraPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'main');
    const command = `cd ${menheraPath}; git fetch; git pull origin master`;

    exec(command, error => {
      if (error) {
        logger.error(`API SERVER ERROR: ${error}`);
        res.send(`error: ${error.message}`).status(500);
        github(500, error.message);
        return;
      }
      res.sendStatus(200);
      github(200, 'Deploy finalizado com sucesso');
    });
  } catch (err) {
    logger.error(`API SERVER ERROR: ${err}`);
    res.sendStatus(500);
    github(500, err.message);
  }
};
