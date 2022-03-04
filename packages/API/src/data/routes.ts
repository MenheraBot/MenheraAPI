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
DataRouter.get('/assets/:type', AssetsController.getImageUrl);

const ActivityGroup = Router();
ActivityGroup.get('/', ActivityController.all);
ActivityGroup.post('/', ActivityController.add);
ActivityGroup.put('/', ActivityController.reset);
ActivityGroup.delete('/', ActivityController.clear);

const StatisticsGroup = Router();
// Jogo do Bicho System
StatisticsGroup.post('/bicho', JogoDoBichoController.addBet); // Create a bet
StatisticsGroup.patch('/bicho', JogoDoBichoController.userWin); // Update if user win a bet
// Hunt Command
StatisticsGroup.get('/hunt', HuntsController.getUserInfo);
StatisticsGroup.post('/hunt', HuntsController.postHuntMade);
// Blackjack Command
StatisticsGroup.get('/blackjack', BlackJackController.getUserInfo);
StatisticsGroup.post('/blackjack', BlackJackController.postBlackJack);
// Coinflip Command
StatisticsGroup.get('/coinflip', CoinflipController.getUserInfo);
StatisticsGroup.post('/coinflip', CoinflipController.postCoinflip);

const UsagesGroup = Router();
UsagesGroup.post('/commands', StatsController.postCommand);

UsagesGroup.get('/inactive', UsagesController.getInactiveUsers);
UsagesGroup.get('/most', UsagesController.mostUsersAndCommands);
UsagesGroup.get('/top/command', UsagesController.topCommands);
UsagesGroup.get('/top/user', UsagesController.topUsers);
UsagesGroup.get('/user', UsagesController.getUserInfo);
UsagesGroup.get('/user/delete', UsagesController.getUserDeleteCommand);

DataRouter.use('/activity', ActivityGroup);
DataRouter.use('/statistics', StatisticsGroup);
DataRouter.use('/usages', UsagesGroup);

export default DataRouter;
