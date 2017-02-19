import React from 'react';
import CurrencyStore from '../stores/currency';
import { observer } from 'mobx-react';
import io from 'socket.io-client';

const socket = io('/');
const currency = new CurrencyStore();

socket.on('connect', () => console.log('socket connected'));
socket.on('hw', (data) => currency.hw = data);
socket.on('disconnect', function(){});

@observer class Worker extends React.Component {
  render() {
    return (<div>{ currency.hw }</div>)
  }
}

export default Worker;
