import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import logger from '@menhera-tools/logger';
import rateLimit from 'express-rate-limit';

import NotFound from './api/middlewares/NotFound';
import ErrorHandler from './api/middlewares/ErrorHandler';
import isAuthorized from './api/middlewares/isAuthorized';

import ApiRoutes from './api/routes';
import StatusRoutes from './status/routes';

const app = express();
const server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 15,
  skip: (req: Request) => req.headers['user-agent'] === process.env.MENHERA_AGENT,
  handler: (_req: Request, res: Response) => {
    res.status(429).send({ message: 'You are beeing rate limited' });
  },
});

app.use(
  cors({
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE', 'PUT'],
    origin: true,
    maxAge: 86400,
    preflightContinue: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use('/status', limiter, StatusRoutes);

app.use('/api', isAuthorized, ApiRoutes);

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  logger.info(`[API] Server started on port ${process.env.PORT}`);
});
