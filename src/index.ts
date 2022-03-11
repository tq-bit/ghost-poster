import { getNetworkInterfaces } from './util/network.util';

const HOST: string = '0.0.0.0';
const NETWORK_HOST: any = getNetworkInterfaces();
const PORT: Number = 8080;

import express from 'express';
import logger from './util/logger.util';
import accessLogger from './middleware/accesslog.middleware';
import apiRouter from './routes/api.router';

const app: express.Application = express();

app.use(accessLogger);
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  logger.verbose(`Server listening on http://${HOST}:${PORT}`);
  logger.verbose('The following network interfaces are available on your machine:')
  logger.verbose(NETWORK_HOST);
});
