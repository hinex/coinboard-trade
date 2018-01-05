const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const SocketIO = require('socket.io');
const config = require('./config');
const worker = require('./workers');
const logger = require('./services/logger');
const compression = require('compression');
const app = express();
const io = new SocketIO(app.server);

if (!config.isProduction) {
  logger.level = 'debug';
  app.use(morgan('dev'));
}

app.server = http.createServer(app);

worker(io);

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use(express.static('public'));
app.use(compression());
app.server.listen(process.env.PORT || config.port);

logger.info(`Started on port ${app.server.address().port}`);
module.exports = app;
