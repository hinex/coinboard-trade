import React from 'react';
import CurrencyStore from '../stores/currency';
import { observer } from 'mobx-react';
import io from 'socket.io-client';
import currencyHelper from '../helpers/currency';

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
socket.on('updateCurrency', (data) => currencyStore.updateCurrency = currencyHelper.processObject(data));

@observer class Worker extends React.Component {
  render() {
    return (<div>{ currencyStore.updateCurrency }</div>)
  }
}

export default Worker;
