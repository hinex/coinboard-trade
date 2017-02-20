import Parser from './parser';
import logger from '../helpers/logger';
import config from '../config';

const parser = new Parser({
  btce: 'https://btc-e.com/api/3/ticker/btc_eur-btc_usd',
  blockchain: 'https://blockchain.info/ticker',
  coindesk: 'http://api.coindesk.com/v1/bpi/currentprice.json',
});

const currency = {
  btce: {},
  blockchain: {},
  coindesk: {},
};

const processingInterval = () => {
  Object.keys(currency).forEach((key) => {
    const saveCurrency = (result) => {
      if (!result && result !== {}) return;

      currency[key] = result;
    };

    parser.getCurrency(key)
      .then(saveCurrency)
      .catch(err => logger.error(err));
  });
};

const startCurrencyWatcher = () => {
  setInterval(() => {
    processingInterval();
  }, config.updateInterval);
};

export default class Currency {
  constructor() {
    startCurrencyWatcher();
  }

  sendSocket(socket) {
    const sendCurrency = () => {
      socket.emit('updateCurrency', currency);
    };

    const interval = setInterval(sendCurrency, config.updateInterval);

    const disconnect = () => {
      clearInterval(interval);
    };

    socket.on('disconnect', disconnect);
  }
}
