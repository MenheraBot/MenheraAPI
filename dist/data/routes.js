"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ActivitiesController_1 = __importDefault(require("./controllers/ActivitiesController"));
const BlackjackController_1 = __importDefault(require("./controllers/BlackjackController"));
const CommandsController_1 = __importDefault(require("./controllers/CommandsController"));
const UsagesController_1 = __importDefault(require("./controllers/UsagesController"));
const CoinflipController_1 = __importDefault(require("./controllers/CoinflipController"));
const HuntController_1 = __importDefault(require("./controllers/HuntController"));
const RoleplayController_1 = __importDefault(require("./controllers/RoleplayController"));
const JogoDoBichoController_1 = __importDefault(require("./controllers/JogoDoBichoController"));
const RouletteController_1 = __importDefault(require("./controllers/RouletteController"));
const DataRouter = (0, express_1.Router)();
const ActivityGroup = (0, express_1.Router)();
ActivityGroup.get('/', ActivitiesController_1.default.all);
ActivityGroup.post('/', ActivitiesController_1.default.add);
ActivityGroup.put('/', ActivitiesController_1.default.reset);
ActivityGroup.delete('/', ActivitiesController_1.default.clear);
const StatisticsGroup = (0, express_1.Router)();
// Jogo do Bicho System
StatisticsGroup.get('/bicho', JogoDoBichoController_1.default.getUserInfo);
StatisticsGroup.get('/bicho/top', JogoDoBichoController_1.default.topBicho);
StatisticsGroup.post('/bicho', JogoDoBichoController_1.default.postBichoGame);
// Hunt Command
StatisticsGroup.get('/hunt', HuntController_1.default.getUserInfo);
StatisticsGroup.get('/hunt/top', HuntController_1.default.topHunts);
StatisticsGroup.post('/hunt', HuntController_1.default.postHuntMade);
// Blackjack Command
StatisticsGroup.get('/blackjack', BlackjackController_1.default.getUserInfo);
StatisticsGroup.get('/blackjack/top', BlackjackController_1.default.topBlackjack);
StatisticsGroup.post('/blackjack', BlackjackController_1.default.postBlackJack);
// Coinflip Command
StatisticsGroup.get('/coinflip', CoinflipController_1.default.getUserInfo);
StatisticsGroup.get('/coinflip/top', CoinflipController_1.default.topCoinflip);
StatisticsGroup.post('/coinflip', CoinflipController_1.default.postCoinflip);
// Roulette Command
StatisticsGroup.get('/roulette', RouletteController_1.default.getUserRouletteStatus);
StatisticsGroup.get('/roulette/top', RouletteController_1.default.topRoulette);
StatisticsGroup.post('/roulette', RouletteController_1.default.postRouletteGame);
const UsagesGroup = (0, express_1.Router)();
UsagesGroup.post('/commands', CommandsController_1.default.postCommand);
UsagesGroup.get('/inactive', UsagesController_1.default.getInactiveUsers);
UsagesGroup.get('/user', UsagesController_1.default.getUserInfo);
UsagesGroup.get('/top/command', UsagesController_1.default.topCommands);
UsagesGroup.get('/top/user', UsagesController_1.default.topUsers);
const RoleplayGroup = (0, express_1.Router)();
RoleplayGroup.get('/battleconf', RoleplayController_1.default.getConfig);
RoleplayGroup.patch('/battleconf', RoleplayController_1.default.setConfig);
DataRouter.use('/activity', ActivityGroup);
DataRouter.use('/statistics', StatisticsGroup);
DataRouter.use('/usages', UsagesGroup);
DataRouter.use('/roleplay', RoleplayGroup);
exports.default = DataRouter;
