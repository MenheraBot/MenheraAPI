import { Router } from 'express';
import ActivityController from './controllers/activity.controllers';
import AssetsController from './controllers/assets.controllers';
import BlackJackController from './controllers/blackjack.controllers';
import StatsController from './controllers/stats.controllers';
import UsagesController from './controllers/usages.controllers';
import CoinflipController from './controllers/coinflip.controllers';
import HuntsController from './controllers/hunts.controllers';
import JogoDoBichoController from './controllers/jogodobicho.controller';

const DataRouter = Router();

DataRouter.get('/activity', ActivityController.random);
DataRouter.get('/activity/all', ActivityController.all);
DataRouter.post('/activity', ActivityController.add);
DataRouter.put('/activity', ActivityController.reset);
DataRouter.delete('/activity', ActivityController.clear);

DataRouter.get('/assets/:type', AssetsController.getImageUrl);

DataRouter.post('/bicho/bet', JogoDoBichoController.addBet);
DataRouter.patch('/bicho/win', JogoDoBichoController.userWin);

DataRouter.get('/blackjack', BlackJackController.getUserInfo);
DataRouter.post('/blackjack', BlackJackController.postBlackJack);

DataRouter.get('/coinflip', CoinflipController.getUserInfo);
DataRouter.post('/coinflip', CoinflipController.postCoinflip);

DataRouter.post('/commands', StatsController.postCommand);

DataRouter.get('/hunt', HuntsController.getUserInfo);
DataRouter.post('/hunt', HuntsController.postHuntMade);

DataRouter.get('/usages/inactive', UsagesController.getInactiveUsers);
DataRouter.get('/usages/most', UsagesController.mostUsersAndCommands);
DataRouter.get('/usages/top/command', UsagesController.topCommands);
DataRouter.get('/usages/top/user', UsagesController.topUsers);
DataRouter.get('/usages/user', UsagesController.getUserInfo);
DataRouter.get('/usages/user/delete', UsagesController.getUserDeleteCommand);

export default DataRouter;
