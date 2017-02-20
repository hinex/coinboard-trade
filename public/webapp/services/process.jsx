import React from 'react';
import moment from 'moment';

const dateProcess = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

const rateProcess = rate => (parseFloat(rate).toFixed(2));

const buildRateBlocks = (data) => {
  const blocks = [];

  const buildBlock = (block) => {
    if (typeof data[block] === 'undefined') return;

    const date = dateProcess(data[block].updated);
    const usd = rateProcess(data[block].rate.usd);
    const eur = rateProcess(data[block].rate.eur);

    blocks.push((
      <div className="block">
        <div className="name">{data[block].name}</div>
        <div className="rates">
          <span className="usd">{usd}</span>
          <span className="eur">{eur}</span>
        </div>
        <div className="data">{date}</div>
      </div>
    ));
  };

  Object.keys(data).forEach(buildBlock);
  return blocks;
};

export default {
  updateCurrency: data => buildRateBlocks(data),
};
