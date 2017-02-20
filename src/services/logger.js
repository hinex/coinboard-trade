import { Logger, transports } from 'winston';

const config = {
  transports: [
    new (transports.Console)({ colorize: true }),
  ],
};

export default new Logger(config);
