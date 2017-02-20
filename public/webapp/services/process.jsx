import React from 'react';
import moment from 'moment';

const dateProcess = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

const buildRateBlocks = (data) => {
  const blocks = [];

  const buildBlock = (block) => {
    if (typeof data[block] === 'undefined') return;

    const date = dateProcess(data[block].updated);

    blocks.push((
      <div className="block">
        <div className="name">{data[block].name}</div>
        <div className="rates">
          <span className="usd">{data[block].rate.usd}</span>
          <span className="eur">{data[block].rate.eur}</span>
        </div>
        <div className="data">{date}</div>
      </div>
    ));
  };

  Object.keys(data).forEach(buildBlock);
  return blocks;
};


const updateCurrency = (data) => {
  const buildResponse = buildRateBlocks(data);
  return <div className="rates">{buildResponse}</div>;
};

export default {
  updateCurrency,
};
