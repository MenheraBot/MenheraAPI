import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'node:http';
import rateLimit from 'express-rate-limit';

import NotFound from './data/middlewares/NotFound';
import ErrorHandler from './data/middlewares/ErrorHandler';
import isAuthorized from './data/middlewares/isAuthorized';

import DataRouter from './data/routes';
import InfoRouter from './info/routes';

const app = express();
const server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 20 * 1000,
  max: 10,
  skip: (req: Request) => req.headers['user-agent'] === process.env.MENHERA_AGENT,
  handler: (_req: Request, res: Response) => {
    res.status(429).send({ message: 'This resource hurts me... Please be kind >_<' });
  },
});

app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.contentType('application/json');
  return next();
});

app.use('/info', limiter, InfoRouter);

app.use('/data', isAuthorized, DataRouter);

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  console.log(`[API] Server started on port ${process.env.PORT}`);
});
