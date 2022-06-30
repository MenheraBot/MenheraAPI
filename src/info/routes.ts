import { Router } from 'express';
import ShardController from './controllers/ShardsController';
import isAuthorized from '../data/middlewares/isAuthorized';
import CommandsController from './controllers/CommandsController';

const startTime = Date.now();

const InfoRouter = Router();

InfoRouter.get('/shards', ShardController.getShardStatus);
InfoRouter.put('/shards', isAuthorized, ShardController.updateShardStatus);

InfoRouter.get('/commands', CommandsController.getCommands);
InfoRouter.post('/commands', isAuthorized, CommandsController.createCommands);
InfoRouter.patch('/commands/:name', isAuthorized, CommandsController.editMaintenance);

InfoRouter.get('/disabled', CommandsController.disabledCommands);

InfoRouter.get('/ping', (_, res) => res.status(200).json({ uptime: Date.now() - startTime }));

export default InfoRouter;
