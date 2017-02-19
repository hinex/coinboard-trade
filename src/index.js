import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import SocketIO from 'socket.io';
import config from './config/development';
import Worker from './workers';

const app = express();
app.server = http.createServer(app);

const io = new SocketIO(app.server);
const worker = new Worker(io);
worker.start();

app.use(morgan('dev'));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use(express.static('public'));
app.server.listen(process.env.PORT || config.port);

console.log(`Started on port ${app.server.address().port}`);
export default app;
