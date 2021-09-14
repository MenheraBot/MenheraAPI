import { Router } from 'express';
import ActivityController from './controllers/activity.controllers';
import AssetsController from './controllers/assets.controllers';
import BlackJackController from './controllers/blackjack.controllers';
import StatsController from './controllers/stats.controllers';
import UsagesController from './controllers/usages.controllers';
import CoinflipController from './controllers/coinflip.controllers';
import HuntsController from './controllers/hunts.controllers';

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

router.get('/hunt', HuntsController.getUserInfo);
router.post('/hunt', HuntsController.postHuntMade);

router.get('/usages/most', UsagesController.mostUsersAndCommands);
router.get('/usages/top/command', UsagesController.topCommands);
router.get('/usages/top/user', UsagesController.topUsers);
router.get('/usages/user', UsagesController.getUserInfo);
router.get('/usages/user/delete', UsagesController.getUserDeleteCommand);

export default router;
