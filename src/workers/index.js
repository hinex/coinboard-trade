import currency from '../workers/currency';
import config from '../config';

const sendSocket = (socket) => {
  const sendCurrency = () => (socket.emit('updateCurrency', currency));

  const interval = setInterval(sendCurrency, config.updateInterval);
  const disconnect = () => (clearInterval(interval));

  socket.on('disconnect', disconnect);
};

export default (io) => io.on('connection', sendSocket);
