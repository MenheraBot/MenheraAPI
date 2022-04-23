import { Router } from 'express';
import ActivityController from './controllers/ActivitiesController';
import AssetsController from './controllers/AssetsController';
import BlackJackController from './controllers/BlackjackController';
import StatsController from './controllers/CommandsController';
import UsagesController from './controllers/UsagesController';
import CoinflipController from './controllers/CoinflipController';
import HuntsController from './controllers/HuntController';
import RoleplayController from './controllers/RoleplayController';
import JogoDoBichoController from './controllers/JogoDoBichoController';
import RouletteController from './controllers/RouletteController';

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
// Roulette Command
StatisticsGroup.get('/roulette', RouletteController.getUserRouletteStatus);
StatisticsGroup.post('/roulette', RouletteController.postRouletteGame);

const UsagesGroup = Router();
UsagesGroup.post('/commands', StatsController.postCommand);

UsagesGroup.get('/inactive', UsagesController.getInactiveUsers);
UsagesGroup.get('/user', UsagesController.getUserInfo);
UsagesGroup.get('/top/command', UsagesController.topCommands);
UsagesGroup.get('/top/user', UsagesController.topUsers);

const RoleplayGroup = Router();
RoleplayGroup.get('/battleconf', RoleplayController.getConfig);
RoleplayGroup.patch('/battleconf', RoleplayController.setConfig);

DataRouter.use('/activity', ActivityGroup);
DataRouter.use('/statistics', StatisticsGroup);
DataRouter.use('/usages', UsagesGroup);
DataRouter.use('/roleplay', RoleplayGroup);

export default DataRouter;