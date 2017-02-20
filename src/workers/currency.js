import Parser from '../services/parser';
import logger from '../services/logger';
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
      if (!result) return;
      currency[key] = result;
    };

    parser.getCurrency(key)
      .then(saveCurrency)
      .catch(err => logger.error(err));
  });
};

setInterval(processingInterval, config.updateInterval);

export default currency;
