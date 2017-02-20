import Promise from 'bluebird';
import Request from 'request';

const request = Promise.promisify(Request);

const resultTemplate = (name, usd, eur) => ({ name, rate: { usd, eur }, updated: new Date() });

const btceParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('btc-e.com', json.btc_usd.avg, json.btc_eur.avg);
};

const blockchainParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('blockchain.com', json.USD.last, json.EUR.last);
};

const coindeskParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('CoinDesk.com', json.bpi.USD.rate.replace(',', ''), json.bpi.EUR.rate.replace(',', ''));
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
