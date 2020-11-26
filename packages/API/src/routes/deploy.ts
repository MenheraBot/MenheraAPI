import express from 'express';
import { exec } from 'child_process';
import make_request from '../util/sendMessage';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const command = 'cd ../../../main; git fetch; git pull origin master';

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log('[API SERVER ERROR]');
        res.send(`error: ${error.message}`).status(500);
        make_request.github(500, error.message);
        return;
      }
      res.sendStatus(200);
      make_request.github(200, 'Deploy finalizado com sucesso');
    });
  } catch (err) {
    console.log('[API SERVER ERROR]');
    res.sendStatus(500);
    make_request.github(500, err.message);
  }
});

module.exports = router;
