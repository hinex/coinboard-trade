import Promise from 'bluebird';
import Request from 'request';

const request = Promise.promisify(Request);

const resultTemplate = (name, rate) => ({ name, rate, updated: new Date() });

const btceParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('BTC-E', json.btc_eur.avg);
};

const blockchainParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('Blockchain', json.EUR.last);
};

const coindeskParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('CoinDesk', json.bpi.EUR.rate);
};


const parsers = {
  btce: btceParser,
  blockchain: blockchainParser,
  coindesk: coindeskParser,
};


export default class Parser {
  constructor(api) {
    this.api = api;
  }

  getData(key) {
    return request(this.api[key])
      .then(parsers[key]);
  }

  getCurrency(key) {
    return this.getData(key);
  }
}