import currency from '../workers/currency';
import config from '../config';

const sendSocket = (socket) => {
  const sendCurrency = () => {
    socket.emit('updateCurrency', currency.currency);
  };

  const interval = setInterval(sendCurrency, config.updateInterval);

  const disconnect = () => {
    clearInterval(interval);
  };

  socket.on('disconnect', disconnect);
};

export default class Worker {
  constructor(io) {
    this.io = io;
  }

  start() {
    this.io.on('connection', sendSocket);
  }
}
