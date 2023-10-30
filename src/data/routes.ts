import { Router } from 'express';
import BlackJackController from './controllers/BlackjackController';
import StatsController from './controllers/CommandsController';
import UsagesController from './controllers/UsagesController';
import CoinflipController from './controllers/CoinflipController';
import HuntsController from './controllers/HuntController';
import JogoDoBichoController from './controllers/JogoDoBichoController';
import RouletteController from './controllers/RouletteController';
import TransactionsController from './controllers/TransactionsController';
import PokerController from './controllers/PokerController';
import FarmController from './controllers/FarmController';

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
// Poker Command
StatisticsGroup.post('/poker', PokerController.postPokerRound);
StatisticsGroup.get('/poker', PokerController.getUserPokerStatus);
// Transactions System
StatisticsGroup.get('/transaction', TransactionsController.getTransactionsFromUser);
StatisticsGroup.post('/transaction', TransactionsController.postTransaction);
// Fazendinha Command
StatisticsGroup.get('/fazendinha', FarmController.getFarmerData);
StatisticsGroup.post('/fazendinha', FarmController.postAction);

const UsagesGroup = Router();
UsagesGroup.post('/commands', StatsController.postCommand);

UsagesGroup.get('/lastban/:id', UsagesController.getUserLastBanTime);
UsagesGroup.get('/bans/:id', UsagesController.getUserBans);

UsagesGroup.get('/inactive', UsagesController.getInactiveUsers);
UsagesGroup.get('/user', UsagesController.getUserInfo);
UsagesGroup.get('/top/commands', UsagesController.topCommands);
UsagesGroup.get('/top/users', UsagesController.topUsers);

DataRouter.use('/statistics', StatisticsGroup);
DataRouter.use('/usages', UsagesGroup);

export default DataRouter;
