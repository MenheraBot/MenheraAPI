import { Router } from 'express';
import ActivityController from './controllers/ActivityController';
import AssetsController from './controllers/AssetsController';
import BlackJackController from './controllers/BlackJackController';
import StatsController from './controllers/StatsController';
import AuthController from './controllers/AuthController';
import UsagesController from './controllers/UsagesController';
import CoinflipController from './controllers/CoinflipController';
import RpgController from './controllers/RpgController';

import isAuthorized from './middlewares/isAuthorized';
import StatusController from './controllers/StatusController';

const router = Router();

router.get('/unknown', isAuthorized, UsagesController.getAllUsersIdsThatDoNotUseMenheraAnymore)

router.get('/activity', ActivityController.random);
router.get('/activity/all', ActivityController.all);
router.post('/activity', isAuthorized, ActivityController.add);
router.put('/activity', isAuthorized, ActivityController.reset);
router.delete('/activity', isAuthorized, ActivityController.clear);

router.get('/assets/:type', AssetsController.getImageUrl);

router.post('/auth', isAuthorized, AuthController.check);

router.get('/blackjack', isAuthorized, BlackJackController.getUserInfo);
router.post('/blackjack', isAuthorized, BlackJackController.postBlackJack);

router.get('/coinflip', isAuthorized, CoinflipController.getUserInfo);
router.post('/coinflip', isAuthorized, CoinflipController.postCoinflip);

router.post('/commands', isAuthorized, StatsController.postCommand);

router.post('/rpg', isAuthorized, RpgController.postBattle);

router.all('/status', StatusController.status);

router.get('/usages/most', isAuthorized, UsagesController.mostUsersAndCommands);
router.get('/usages/top/command', isAuthorized, UsagesController.topCommands);
router.get('/usages/top/user', isAuthorized, UsagesController.topUsers);
router.get('/usages/user', isAuthorized, UsagesController.getUserInfo);

export default router;
