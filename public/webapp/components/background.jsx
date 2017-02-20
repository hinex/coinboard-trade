import React from 'react';

const getUrl = () => {
  const random = Math.floor(Math.random() * 5) + 1;
  return `/timelaps/0${random}.mp4`;
};

const background = () => (
  <div className="background">
    <video autoPlay loop className="video" muted>
      <source src={getUrl()} type="video/mp4" />
    </video>
  </div>
);

export default background;
