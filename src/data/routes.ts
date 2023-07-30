import { Router } from 'express';
import BlackJackController from './controllers/BlackjackController';
import StatsController from './controllers/CommandsController';
import UsagesController from './controllers/UsagesController';
import CoinflipController from './controllers/CoinflipController';
import HuntsController from './controllers/HuntController';
import JogoDoBichoController from './controllers/JogoDoBichoController';
import RouletteController from './controllers/RouletteController';

const DataRouter = Router();

const StatisticsGroup = Router();
// Jogo do Bicho System
StatisticsGroup.get('/bicho', JogoDoBichoController.getUserInfo);
StatisticsGroup.get('/bicho/top', JogoDoBichoController.topBicho);
StatisticsGroup.post('/bicho', JogoDoBichoController.postBichoGame);
// Hunt Command
StatisticsGroup.get('/hunt', HuntsController.getUserInfo);
StatisticsGroup.get('/hunt/top', HuntsController.topHunts);
StatisticsGroup.post('/hunt', HuntsController.postHuntMade);
// Blackjack Command
StatisticsGroup.get('/blackjack', BlackJackController.getUserInfo);
StatisticsGroup.get('/blackjack/top', BlackJackController.topBlackjack);
StatisticsGroup.post('/blackjack', BlackJackController.postBlackJack);
// Coinflip Command
StatisticsGroup.get('/coinflip', CoinflipController.getUserInfo);
StatisticsGroup.get('/coinflip/top', CoinflipController.topCoinflip);
StatisticsGroup.post('/coinflip', CoinflipController.postCoinflip);
// Roulette Command
StatisticsGroup.get('/roulette', RouletteController.getUserRouletteStatus);
StatisticsGroup.get('/roulette/top', RouletteController.topRoulette);
StatisticsGroup.post('/roulette', RouletteController.postRouletteGame);

const UsagesGroup = Router();
UsagesGroup.post('/commands', StatsController.postCommand);

UsagesGroup.get('/lastban/:id', UsagesController.getUserLastBanTime);
UsagesGroup.get('/bans/:id', UsagesController.getUserBans);

UsagesGroup.get('/inactive', UsagesController.getInactiveUsers);
UsagesGroup.get('/user', UsagesController.getUserInfo);
UsagesGroup.get('/top/command', UsagesController.topCommands);
UsagesGroup.get('/top/user', UsagesController.topUsers);

DataRouter.use('/statistics', StatisticsGroup);
DataRouter.use('/usages', UsagesGroup);

export default DataRouter;
