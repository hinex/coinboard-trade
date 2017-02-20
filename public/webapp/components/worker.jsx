import React from 'react';
import { observer } from 'mobx-react';
import io from 'socket.io-client';
import CurrencyStore from '../stores/currency';
import process from '../services/process';

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
socket.on('updateCurrency', (data) => currencyStore.updateCurrency = process.updateCurrency(data));

@observer class Worker extends React.Component {
  render() {
    return (
      <div>
        { currencyStore.updateCurrency }
        <div className="cover"><img src="/images/background.jpeg" className="cover" alt=""/></div>
        <div className={currencyStore.updateCurrency === false ? 'loader' : 'loader hide'}><span>Loading...</span></div>
      </div>
    )
  }
}

export default Worker;
