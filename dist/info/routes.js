"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ShardsController_1 = __importDefault(require("./controllers/ShardsController"));
const isAuthorized_1 = __importDefault(require("../data/middlewares/isAuthorized"));
const CommandsController_1 = __importDefault(require("./controllers/CommandsController"));
const startTime = Date.now();
const InfoRouter = (0, express_1.Router)();
InfoRouter.get('/shards', ShardsController_1.default.getShardStatus);
InfoRouter.put('/shards', isAuthorized_1.default, ShardsController_1.default.updateShardStatus);
InfoRouter.get('/commands', CommandsController_1.default.getCommands);
InfoRouter.post('/commands', isAuthorized_1.default, CommandsController_1.default.createCommands);
InfoRouter.patch('/commands/:name', isAuthorized_1.default, CommandsController_1.default.editMaintenance);
InfoRouter.get('/ping', (_, res) => {
    return res.status(200).json({ uptime: Date.now() - startTime });
});
exports.default = InfoRouter;
