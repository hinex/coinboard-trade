import Promise from 'bluebird';
import Request from 'request';

const request = Promise.promisify(Request);

const btceParser = (data) => {
  return data.body;
};

const blockchainParser = (data) => {
  return data.body;
};

const coindeskParser = (data) => {
  return data.body;
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