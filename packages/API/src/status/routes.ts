import { Router } from 'express';
import ShardController from './controllers/shard.controller';
import isAuthorized from '../api/middlewares/isAuthorized';
import CommandsController from './controllers/commands.controller';

const router = Router();

router.get('/shard', ShardController.getShardStatus);
router.put('/shard/:id', isAuthorized, ShardController.updateShardStatus);

router.get('/commands', CommandsController.getCommands);
router.put('/commands', isAuthorized, CommandsController.createCommand);
router.patch('/commands/:name', isAuthorized, CommandsController.editMaintenance);

export default router;
