import Parser from './parser';

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
    parser.getCurrency(key)
      .then(result => (currency[key] = result));
  });
};

const startCurrencyWatcher = () => {
  setInterval(() => {
    processingInterval();
  }, 3000);
};

export default class Currency {
  constructor() {
    this.clientsCount = 0;
    startCurrencyWatcher();
  }

  sendSocket(socket) {
    this.clientsCount += 1;

    const sendCurrency = () => {
      socket.emit('hw', currency);
    };

    const interval = setInterval(sendCurrency, 3000);

    const disconnect = () => {
      clearInterval(interval);
      this.clientsCount -= 1;
    };

    socket.on('disconnect', disconnect);
  }
}
