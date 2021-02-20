import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Http from 'http';
import logger from '@menhera-tools/logger';
import routes from './routes';
import './database/MongoDB';

import NotFound from './middlewares/NotFound';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();
const server = Http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  logger.info(`[API] Server started on port ${process.env.PORT}`);
});
