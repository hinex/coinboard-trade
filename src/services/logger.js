const { Logger, transports } = require('winston');

const config = {
  transports: [
    new (transports.Console)({ colorize: true }),
  ],
};

module.exports = new Logger(config);
