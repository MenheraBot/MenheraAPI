import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Http from 'http';
import routes from './routes';

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
  console.log(`[API] Server started on port ${process.env.PORT}`);
});
