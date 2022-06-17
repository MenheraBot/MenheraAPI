"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const NotFound_1 = __importDefault(require("./data/middlewares/NotFound"));
const ErrorHandler_1 = __importDefault(require("./data/middlewares/ErrorHandler"));
const isAuthorized_1 = __importDefault(require("./data/middlewares/isAuthorized"));
const routes_1 = __importDefault(require("./data/routes"));
const routes_2 = __importDefault(require("./info/routes"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 1000,
    max: 15,
    skip: (req) => req.headers['user-agent'] === process.env.MENHERA_AGENT,
    handler: (_req, res) => {
        res.status(429).send({ message: 'You are beeing rate limited' });
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use((_, res, next) => {
    res.contentType('application/json');
    return next();
});
app.use('/info', limiter, routes_2.default);
app.use('/data', isAuthorized_1.default, routes_1.default);
app.use(NotFound_1.default);
app.use(ErrorHandler_1.default);
server.listen(process.env.PORT, () => {
    console.log(`[API] Server started on port ${process.env.PORT}`);
});
