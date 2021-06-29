import express from 'express';
import cors from 'cors';
import Http from 'http';
import Https from 'https';
import fs from 'fs';
import logger from '@menhera-tools/logger';
import { config } from 'dotenv';
import path from 'path';
import routes from './routes';
import './database/MongoDB';

import NotFound from './middlewares/NotFound';
import ErrorHandler from './middlewares/ErrorHandler';

config({ path: path.resolve(path.join(__dirname, '..', '.env')) });

const app = express();

let error = false;
let credentials;

try {
  credentials.key = fs.readFileSync('/etc/letsencrypt/live/vps.menherabot.xyz/privkey.pem', 'utf8');
  credentials.cert = fs.readFileSync('/etc/letsencrypt/live/vps.menherabot.xyz/cert.pem', 'utf8');
  credentials.ca = fs.readFileSync('/etc/letsencrypt/live/vps.menherabot.xyz/chain.pem', 'utf8');
} catch {
  error = true;
}

const httpServer = Http.createServer(app);

app.use(express.static(__dirname, { dotfiles: 'allow' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(NotFound);
app.use(ErrorHandler);

httpServer.listen(80, () => {
  logger.info('[API] HTTP Server running on port 80');
});

httpServer.listen(25156, () => {
  logger.info('[API] HTTP Server running on port 25156');
});

if (!error) {
  const httpsServer = Https.createServer(credentials, app);
  httpsServer.listen(443, () => {
    logger.info('[API] HTTPS Server running on port 443');
  });
}
