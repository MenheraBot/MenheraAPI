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
const server = Http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  logger.info(`[API] Server started on port ${process.env.PORT}`);
});
