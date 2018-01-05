const currency = require('../workers/currency');
const config = require('../config');

const sendSocket = (socket) => {
  const sendCurrency = () => (socket.emit('updateCurrency', currency));

  const interval = setInterval(sendCurrency, config.updateInterval);
  const disconnect = () => (clearInterval(interval));

  socket.on('disconnect', disconnect);
};

module.exports = (io) => io.on('connection', sendSocket);
