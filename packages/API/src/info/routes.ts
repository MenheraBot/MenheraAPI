import { Router } from 'express';
import ShardController from './controllers/ShardsController';
import isAuthorized from '../api/middlewares/isAuthorized';
import CommandsController from './controllers/CommandsController';

const InfoRouter = Router();

InfoRouter.get('/shards', ShardController.getShardStatus);
InfoRouter.put('/shards', isAuthorized, ShardController.updateShardStatus);

InfoRouter.get('/commands', CommandsController.getCommands);
InfoRouter.post('/commands', isAuthorized, CommandsController.createCommands);
InfoRouter.patch('/commands/:name', isAuthorized, CommandsController.editMaintenance);

export default InfoRouter;
