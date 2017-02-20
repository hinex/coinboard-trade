import React from 'react';
import { observer } from 'mobx-react';
import io from 'socket.io-client';
import CurrencyStore from '../stores/currency';
import process from '../services/process';
import Background from './background';

const socket = io('/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 100
});

const currencyStore = new CurrencyStore();

socket.on('connect', () => currencyStore.connectedStatus = true);
socket.on('reconnect', () => console.log('Reconnecting'));
socket.on('disconnect', () => currencyStore.connectedStatus = false);
socket.on('updateCurrency', (data) => currencyStore.updateCurrency = process.updateCurrency(data, currencyStore));

const changeRate = observer(() => process.updateCurrentRate(currencyStore.currenct))

@observer class Worker extends React.Component {
  render() {
    const updateCurrency = currencyStore.updateCurrency === false;
    const connectedStatus = !currencyStore.connectedStatus && !updateCurrency;

    return (
      <div>
        <div className="currency">
          <div className="calculator">
            <div className="logo">CoinBoard.trade</div>
            <div className="value"><input type="number" /></div>
            <div className="currencies"><select name=""></select></div>
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
