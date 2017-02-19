import Parser from './parser';
import logger from '../helpers/logger';

const parser = new Parser({
  btce: 'https://btc-e.com/api/3/ticker/btc_eur',
  blockchain: 'https://blockchain.info/ticker',
  coindesk: 'http://api.coindesk.com/v1/bpi/currentprice/EUR.json',
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
  }, 3000);
};

export default class Currency {
  constructor() {
    startCurrencyWatcher();
  }

  sendSocket(socket) {
    const sendCurrency = () => {
      socket.emit('updateCurrency', currency);
    };

    const interval = setInterval(sendCurrency, 3000);

    const disconnect = () => {
      clearInterval(interval);
    };

    socket.on('disconnect', disconnect);
  }
}
