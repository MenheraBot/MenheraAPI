import express, { Response } from 'express';
import cors from 'cors';
import Http from 'http';
import logger from '@menhera-tools/logger';
import routes from './routes';

import NotFound from './middlewares/NotFound';
import isAuthorized from './middlewares/isAuthorized';

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

app.use('/api/v1', routes);

app.use(NotFound);

server.listen(process.env.PORT, () => {
  logger.info(`[API] Server started on port ${process.env.PORT}`);
});
