import { Router } from 'express';
import ActivityController from './controllers/ActivityController';
import BotController from './controllers/BotController';
import ShardController from './controllers/ShardController';
import DeployControler from './controllers/DeployController';
import StatsController from './controllers/StatsController';
import AuthController from './controllers/AuthController';

import isAuthorized from './middlewares/isAuthorized';

const router = Router();

router.get('/api/activity', ActivityController.random);
router.get('/api/activity/all', ActivityController.all);
router.post('/api/activity', isAuthorized, ActivityController.add);
router.put('/api/activity', isAuthorized, ActivityController.reset);
router.delete('/api/activity', isAuthorized, ActivityController.clear);

router.get('/api/commands', StatsController.getCommands);
router.post('/api/commands', isAuthorized, StatsController.postCommand);
router.post('/api/commands/clear', isAuthorized, StatsController.clearCommands);

router.post('/api/ready', isAuthorized, BotController.ready);
router.post('/api/down', isAuthorized, BotController.down);

router.post(process.env.SUPER_SECRET_ROUTE, DeployControler);

router.post('/api/shard/ready', isAuthorized, ShardController.ready);
router.post('/api/shard/disconnect', isAuthorized, ShardController.disconnect);
router.post('/api/shard/reconnecting', isAuthorized, ShardController.reconnecting);

router.post('/api/auth', isAuthorized, AuthController.check);
export default router;
