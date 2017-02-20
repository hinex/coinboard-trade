import React from 'react';
import { observer } from 'mobx-react';
import io from 'socket.io-client';
import currencyStore from '../stores/currency';
import rate from '../services/rate';
import Background from './background';

const socket = io('/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 100
});

socket.on('connect', () => currencyStore.connectedStatus = true);
socket.on('disconnect', () => currencyStore.connectedStatus = false);
socket.on('updateCurrency', (data) => currencyStore.updateCurrency = rate.updateCurrency(data));

const setValue = (event) => {
  currencyStore.current.value = event.target.value;
  currencyStore.updateCurrency = rate.manualUpdate();
};

const setCurrency = (event) => {
  currencyStore.current.type = event.target.value;
  currencyStore.updateCurrency = rate.manualUpdate();
};

@observer class Worker extends React.Component {
  activeCurrency(currency) {
    return currency === currencyStore.current.type ? 'active' : '';
  }

  render() {
    const updateCurrency = currencyStore.updateCurrency === false;
    const connectedStatus = !currencyStore.connectedStatus && !updateCurrency;

    return (
      <div>
        <div className="currency">
          <div className="calculator">
            <div className="logo">CoinBoard.trade</div>
            <div className="value"><input type="number" onChange={setValue.bind(this)} value={currencyStore.current.value}/></div>
            <div className="currencies" onChange={setCurrency.bind(this)}>
              <input type="radio" value="btc" name="btc" id="btc"/> <label htmlFor="btc" className={this.activeCurrency('btc')}>BTC</label>
              <input type="radio" value="usd" name="usd" id="usd"/> <label htmlFor="usd" className={this.activeCurrency('usd')}>USD</label>
              <input type="radio" value="eur" name="eur" id="eur"/> <label htmlFor="eur" className={this.activeCurrency('eur')}>EUR</label>
            </div>
          </div>
          <div className="rates">{ currencyStore.updateCurrency }</div>
        </div>
        <Background />
        <div className={updateCurrency ? 'loader' : 'loader hide'}><span>Loading...</span></div>
        <div className={connectedStatus ? 'connect' : 'connect hide'}><span>Reconnecting...</span></div>
      </div>
    )
  }
}

export default Worker;
