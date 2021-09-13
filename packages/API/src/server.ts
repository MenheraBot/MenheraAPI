import './api/database/MongoDB';

import express from 'express';
import cors from 'cors';
import http from 'http';
import logger from '@menhera-tools/logger';

import NotFound from './api/middlewares/NotFound';
import ErrorHandler from './api/middlewares/ErrorHandler';
import isAuthorized from './api/middlewares/isAuthorized';

import ApiRoutes from './api/routes';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', isAuthorized, ApiRoutes);

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  logger.info(`[API] Server started on port ${process.env.PORT}`);
});
