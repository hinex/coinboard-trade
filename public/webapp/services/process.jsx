const btcProcess = (currency, currentState, rate) => {
  if (currentState.type === 'btc') {
    return currentState.value || 1;
  }

  return currentState.value / rate[currentState.type];
};

const calculateRate = (rate, currency, currentState, data) => {
  const valueRate = data[rate];
  const btc = btcProcess(currency, currentState, data);
  return valueRate * btc;
};

const usdProcess = (currency, currentState, data) => {
  if (currentState.type === 'usd') {
    return currentState.value || 1000;
  }

  return calculateRate('usd', currency, currentState, data);
};

const eurProcess = (currency, currentState, data) => {
  if (currentState.type === 'eur') {
    return currentState.value || 1000;
  }

  return calculateRate('eur', currency, currentState, data);
};

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

