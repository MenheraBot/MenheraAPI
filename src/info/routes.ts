import Router from 'express';
import WeeklyHunters from '../data/util/WeeklyHunters';
import isAuthorized from '../data/middlewares/isAuthorized';
import CommandsController from './controllers/CommandsController';
import JogoDoBichoController from '../data/controllers/JogoDoBichoController';

const startTime = Date.now();

const InfoRouter = Router();

InfoRouter.get('/hunts', async (_req, res) => {
  const results = await WeeklyHunters.request();

  return res.send(results);
});

InfoRouter.get('/bicho', JogoDoBichoController.getBichoGames);

InfoRouter.get('/headers', (req, res) => {
  console.log(
    `[${new Date().toISOString()}] IP="${req.headers['cf-connecting-ip']}" COUNTRY="${
      req.headers['cf-ipcountry']
    }" - ${req.headers['user-agent']}`
  );

  res.sendStatus(418);
});

InfoRouter.get('/commands', CommandsController.getCommands);
InfoRouter.post('/commands', isAuthorized, CommandsController.createCommands);
InfoRouter.patch('/commands/:name', isAuthorized, CommandsController.editMaintenance);

InfoRouter.get('/ping', (_, res) => res.status(200).json({ uptime: Date.now() - startTime }));

export default InfoRouter;
