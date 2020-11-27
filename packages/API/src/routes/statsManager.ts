import express from 'express';
import MenheraStats from '../util/variables';
import isAuthorized from '../middlewares/isAuthorized';
import APIError from '../util/APIError';

const router = express.Router();

router.get('/commands', (req, res) => {
  const comandos = MenheraStats.getCommands();
  if (req.query.cmds === 'true') return res.json({ lenght: comandos.lenght });

  return res.json({ lenght: comandos.lenght, commands: comandos.commands });
});

router.post('/commands', isAuthorized, (req, res) => {
  try {
    const {
      authorName, authorId, guildName, guildId, commandName, data,
    } = req.body;

    if (authorName === undefined || authorId === undefined || guildName === undefined
       || guildId === undefined || commandName === undefined || data === undefined) throw new APIError('O request é inválido', 400);

    MenheraStats.setCommands(authorName, authorId, guildName, guildId, commandName, data);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post('/commands/clear', isAuthorized, (req, res) => {
  MenheraStats.clearCommands();
  return res.sendStatus(200);
});

export default router;
