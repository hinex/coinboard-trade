import React from 'react';

const processObject = (data) => {
  return <ul>{JSON.stringify(data)}</ul>;
};

export default {
  processObject,
};
