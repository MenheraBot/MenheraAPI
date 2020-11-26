const express = require('express');
const MenheraLogs = require('../util/variables');

const router = express.Router();

router.get('/', (req, res) => {
  const logs = MenheraLogs.getLogs();

  res.send(logs);
});

router.post('/', (req, res) => {
  const { token } = req.headers;
  /*  const body = req.body.info; */

  if (!token || token !== process.env.API_TOKEN) return res.status(403).send({ message: 'Only the Menhera Client can acess that!' });

  /*  Menhera.setLogs(body); */
  return res.sendStatus(200);
});

module.exports = router;
