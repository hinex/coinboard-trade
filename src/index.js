import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import SocketIO from 'socket.io';
import config from './config';
import worker from './workers';
import logger from './services/logger';
import compression from 'compression';

const app = express();

if (!config.isProduction) {
  logger.level = 'debug';
  app.use(morgan('dev'));
}

app.server = http.createServer(app);

const io = new SocketIO(app.server);
worker(io);

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use(express.static('public'));
app.use(compression());
app.server.listen(process.env.PORT || config.port);

logger.info(`Started on port ${app.server.address().port}`);
export default app;
