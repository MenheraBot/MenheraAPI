/* eslint-disable consistent-return */
import Router from 'express';
import WeeklyHunters from '../data/util/WeeklyHunters';
import isAuthorized from '../data/middlewares/isAuthorized';
import CommandsController from './controllers/CommandsController';
import JogoDoBichoController from '../data/controllers/JogoDoBichoController';

const startTime = Date.now();

const InfoRouter = Router();

InfoRouter.all('/lazymonitor', (req, res): unknown => {
  const { status: sentStatus } = req.query;

  let statusCode = parseInt(`${sentStatus}`, 10);

  if (Number.isNaN(statusCode) || !statusCode) statusCode = 200;

  if (statusCode < 100 || statusCode > 599)
    return res.status(400).json({
      message: 'Viana meu querido, só vou te enviar status codes entre 100 e 599',
    });

  res.statusCode = statusCode;
  res.set('Connection', 'close');

  res.end();
});

InfoRouter.all('/headers', (req, res) => {
  console.log(
    `[${new Date().toISOString()}] IP="${req.headers['cf-connecting-ip']}" COUNTRY="${
      req.headers['cf-ipcountry']
    }" - ${req.headers['user-agent']}`
  );

  console.log('HEADERS', req.headers);
  console.log('BODY', req.body);

  res.status(418).send(JSON.stringify(req.headers));
});

InfoRouter.get('/hunts', async (_req, res) => {
  const results = await WeeklyHunters.request();

  return res.send(results);
});

InfoRouter.get('/bicho', JogoDoBichoController.getBichoGames);
InfoRouter.get('/commands', CommandsController.getCommands);
InfoRouter.post('/commands', isAuthorized, CommandsController.createCommands);
InfoRouter.patch('/commands/:name', isAuthorized, CommandsController.editMaintenance);

InfoRouter.get('/ping', (_, res) => res.status(200).json({ uptime: Date.now() - startTime }));

export default InfoRouter;
