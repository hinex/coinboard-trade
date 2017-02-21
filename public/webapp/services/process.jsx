const btcProcess = (currency, currentState, rate) => {
  const currentStateValue = currentState.value > 0 ? currentState.value : 1;

  if (currentState.type === 'btc') {
    return currentStateValue;
  }

  return currentStateValue / rate[currentState.type];
};

const calculateRate = (rate, currency, currentState, data) => {
  const currentStateValue = currentState.value > 0 ? currentState.value : 1;

  if (currentState.type === rate) {
    return currentStateValue || 1;
  }

  const valueRate = data[rate];
  const btc = btcProcess(currency, currentState, data);
  return valueRate * btc;
};

const usdProcess = (currency, currentState, data) => calculateRate('usd', currency, currentState, data);
const eurProcess = (currency, currentState, data) => calculateRate('eur', currency, currentState, data);

const processList = {
  btc: btcProcess,
  usd: usdProcess,
  eur: eurProcess,
};

export default class Process {
  constructor(currency) {
    this.currency = currency;
  }

  calculate(currency, currentState, vendor) {
    const process = processList[currency];
    const result = process(this.currency, currentState, vendor.rate);
    return parseFloat(result).toFixed(2);
  }
}

