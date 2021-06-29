import express from 'express';
import cors from 'cors';
import Http from 'http';
import logger from '@menhera-tools/logger';
import { config } from 'dotenv';
import path from 'path';
import routes from './routes';
import './database/MongoDB';

import NotFound from './middlewares/NotFound';
import ErrorHandler from './middlewares/ErrorHandler';

config({ path: path.resolve(path.join(__dirname, '..', '.env')) });

const app = express();

const httpServer = Http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(NotFound);
app.use(ErrorHandler);

httpServer.listen(80, () => {
  logger.info('[API] HTTP Server running on port 80');
});
