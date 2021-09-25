import { Router } from 'express';
import ShardController from './controllers/shard.controller';
import isAuthorized from '../api/middlewares/isAuthorized';
import CommandsController from './controllers/commands.controller';

const router = Router();

router.get('/shard', ShardController.getShardStatus);
router.put('/shard/:id', isAuthorized, ShardController.updateShardStatus);

router.get('/commands', CommandsController.getCommands);
router.post('/commands', isAuthorized, CommandsController.createCommands);
router.patch('/commands/:name', isAuthorized, CommandsController.editMaintenance);
router.get('/commands/uses', CommandsController.getCommandsUsages);

export default router;
