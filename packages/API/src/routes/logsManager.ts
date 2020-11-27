import express from 'express';
import MenheraLogs from '../util/variables';
import isAuthorized from '../middlewares/isAuthorized';

const router = express.Router();

router.get('/', (req, res) => {
  const logs = MenheraLogs.getLogs();

  res.send(logs);
});

router.post('/', isAuthorized, (req, res) => {
  const body = req.body.info;

  MenheraLogs.setLogs(body);
  return res.sendStatus(200);
});

export default router;
