import Currency from '../workers/currency';

export default class Worker {
  constructor(io) {
    this.io = io;
  }

  start() {
    const currency = new Currency();
    this.io.on('connection', currency.sendSocket);
  }
}
