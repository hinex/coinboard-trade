import Currency from '../workers/currency';

const currency = new Currency();

export default class Worker {
  constructor(io) {
    this.io = io;
  }

  start() {
    this.io.on('connection', currency.sendSocket);
  }
}
