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
  for (const key in currency) {
    parser.getCurrency(key)
      .then(result => (currency[key] = result));
  }
};

export default class Currency {
  constructor() {
    this.clientsCount = 0;
    this.startCurrencyWatcher();
  }

  startCurrencyWatcher() {
    setInterval(() => {
      // if (this.clientsCount === 0) return;

      processingInterval();
    }, 3000);
  }

  sendSocket(socket) {
    this.clientsCount = socket.server.engine.clientsCount;

    const interval = setInterval(() => socket.emit('hw', currency), 1000);
    const disconnect = () => clearInterval(interval);

    socket.on('disconnect', disconnect);
  }
}
