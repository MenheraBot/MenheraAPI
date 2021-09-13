import express, { Response } from 'express';
import cors from 'cors';
import Http from 'http';
import logger from '@menhera-tools/logger';
import WatchClient from 'client';

import NotFound from './middlewares/NotFound';
import isAuthorized from './middlewares/isAuthorized';
import DefaultController from './Controllers/DefaultController';

const startServer = (client: WatchClient): void => {
  const app = express();
  const server = Http.createServer(app);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawBodySaver = (req: any, _res: Response, buf: Buffer, encoding: BufferEncoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };

  app.use(cors());
  app.use(express.json({ verify: rawBodySaver }));

  app.use(isAuthorized);

  app.post('/api/v1', (req, res) => DefaultController.ReceivedAction(req, res, client));

  app.use(NotFound);

  server.listen(process.env.PORT, () => {
    logger.info(`[AMANDNINHA INTERACTION SERVER] Server started on port ${process.env.PORT}`);
  });
};

export default startServer;
