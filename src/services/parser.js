const Promise = require('bluebird');
const Request = require('request');

const request = Promise.promisify(Request);

const resultTemplate = (name, usd, eur) => ({ name, rate: { usd, eur }, updated: new Date() });

const blockchainParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('blockchain.com', json.USD.last, json.EUR.last);
};

const coindeskParser = (data) => {
  const json = JSON.parse(data.body);
  return resultTemplate('CoinDesk.com', json.bpi.USD.rate.replace(',', ''), json.bpi.EUR.rate.replace(',', ''));
};


const parsers = {
  blockchain: blockchainParser,
  coindesk: coindeskParser,
};

module.exports = class Parser {
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
};
