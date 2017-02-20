import React from 'react';
import moment from 'moment';
import currencyStore from '../stores/currency';
import Process from './process';

let cacheData;
const dateProcess = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

const buildRateBlocks = (data) => {
  cacheData = data;

  const blocks = [];
  const process = new Process(currencyStore.current.type);

  const buildBlock = (block) => {
    if (typeof data[block] === 'undefined') return;

    const date = dateProcess(data[block].updated);
    const vendor = data[block];

    blocks.push((
      <div className="block" key={block}>
        <div className="name">{data[block].name}</div>
        <div className="rates">
          <span className="usd">
            {process.calculate('btc', currencyStore.current, vendor)} <span>btc</span>
          </span>
          <span className="usd">
            {process.calculate('usd', currencyStore.current, vendor)} <span>usd</span>
          </span>
          <span className="eur">
            {process.calculate('eur', currencyStore.current, vendor)} <span>eur</span>
          </span>
        </div>
        <div className="date">{date}</div>
      </div>
    ));
  };

  Object.keys(data).forEach(buildBlock);
  return blocks;
};

export default {
  updateCurrency: data => buildRateBlocks(data),
  manualUpdate: () => buildRateBlocks(cacheData),
};
