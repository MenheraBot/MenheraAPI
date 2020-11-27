import { Router } from 'express';
import ActivityController from './controllers/ActivityController';
import BotController from './controllers/BotController';
import ShardController from './controllers/ShardController';

import isAuthorized from './middlewares/isAuthorized';

const router = Router();

router.get('/api/activity/random', ActivityController.random);
router.get('/api/activity', ActivityController.all);
router.post('/api/activity', isAuthorized, ActivityController.add);
router.put('/api/activity/reset', isAuthorized, ActivityController.reset);
router.delete('/api/activity/clear', isAuthorized, ActivityController.clear);

router.post('/api/ready', isAuthorized, BotController.ready);
router.post('/api/down', isAuthorized, BotController.down);

router.post('/api/shard/ready', isAuthorized, ShardController.ready);
router.post('/api/shard/disconnect', isAuthorized, ShardController.disconnect);
router.post('/api/shard/reconnecting', isAuthorized, ShardController.reconnecting);

export default router;
