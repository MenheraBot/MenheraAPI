import express from 'express';
import { exec } from 'child_process';
import { github } from '../util/sendMessage';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const command = 'cd ../../../main; git fetch; git pull origin master';

    exec(command, (error) => {
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
});

export default router;
