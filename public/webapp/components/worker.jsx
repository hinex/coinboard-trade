import React from 'react';
import CurrencyStore from '../stores/currency';
import { observer } from 'mobx-react';
import io from 'socket.io-client';

const socket = io('/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 100
});

const currency = new CurrencyStore();

socket.on('connect', () => console.log('socket connected'));
socket.on('reconnect', () => console.log('reconnecting...'));
socket.on('disconnect', () => console.log('disconnected'));
socket.on('hw', (data) => currency.hw = JSON.stringify(data));

@observer class Worker extends React.Component {
  render() {
    return (<div>{ currency.hw }</div>)
  }
}

export default Worker;
