import { Router } from 'express';
import ActivityController from './controllers/ActivityController';
import AssetsController from './controllers/AssetsController';
import StatsController from './controllers/StatsController';
import AuthController from './controllers/AuthController';
import UsagesController from './controllers/UsagesController';
import CoinflipController from './controllers/CoinflipController';
import RpgController from './controllers/RpgController';

import isAuthorized from './middlewares/isAuthorized';
import StatusController from './controllers/StatusController';

const router = Router();

router.get('/api/activity', ActivityController.random);
router.get('/api/activity/all', ActivityController.all);
router.post('/api/activity', isAuthorized, ActivityController.add);
router.put('/api/activity', isAuthorized, ActivityController.reset);
router.delete('/api/activity', isAuthorized, ActivityController.clear);

router.get('/api/assets/:type', AssetsController.getImageUrl);

router.post('/api/auth', isAuthorized, AuthController.check);

router.get('/api/coinflip', isAuthorized, CoinflipController.getUserInfo);
router.post('/api/coinflip', isAuthorized, CoinflipController.postCoinflip);

router.post('/api/commands', isAuthorized, StatsController.postCommand);

router.post('/api/rpg', isAuthorized, RpgController.postBattle);

router.all('/api/status', StatusController.status);

router.get('/api/usages/most', isAuthorized, UsagesController.mostUsersAndCommands);
router.get('/api/usages/top/command', isAuthorized, UsagesController.topCommands);
router.get('/api/usages/top/user', isAuthorized, UsagesController.topUsers);
router.get('/api/usages/user', isAuthorized, UsagesController.getUserInfo);

export default router;
