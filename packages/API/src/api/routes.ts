import { Router } from 'express';
import ActivityController from './controllers/ActivityController';
import AssetsController from './controllers/AssetsController';
import BlackJackController from './controllers/BlackJackController';
import StatsController from './controllers/StatsController';
import UsagesController from './controllers/UsagesController';
import CoinflipController from './controllers/CoinflipController';

const router = Router();

router.get('/activity', ActivityController.random);
router.get('/activity/all', ActivityController.all);
router.post('/activity', ActivityController.add);
router.put('/activity', ActivityController.reset);
router.delete('/activity', ActivityController.clear);

router.get('/assets/:type', AssetsController.getImageUrl);

router.get('/blackjack', BlackJackController.getUserInfo);
router.post('/blackjack', BlackJackController.postBlackJack);

router.get('/coinflip', CoinflipController.getUserInfo);
router.post('/coinflip', CoinflipController.postCoinflip);

router.post('/commands', StatsController.postCommand);

router.get('/usages/most', UsagesController.mostUsersAndCommands);
router.get('/usages/top/command', UsagesController.topCommands);
router.get('/usages/top/user', UsagesController.topUsers);
router.get('/usages/user', UsagesController.getUserInfo);
router.get('/usages/user/delete', UsagesController.getUserDeleteCommand);

export default router;
