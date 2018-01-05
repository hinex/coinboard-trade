const Parser = require('../services/parser');
const logger = require('../services/logger');
const config = require('../config');

const parser = new Parser({
  blockchain: 'https://blockchain.info/ticker',
  coindesk: 'http://api.coindesk.com/v1/bpi/currentprice.json',
});

const currency = {
  blockchain: {},
  coindesk: {},
};

const processingInterval = () => {
  Object.keys(currency).forEach((key) => {
    const saveCurrency = (result) => {
      if (!result) return;
      currency[key] = result;
    };

    parser.getCurrency(key)
      .then(saveCurrency)
      .catch(err => logger.debug(err));
  });
};

setInterval(processingInterval, config.updateInterval);

module.exports = currency;
