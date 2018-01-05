const production = require('./production');
const development = require('./development');

module.exports = process.env.NODE_ENV === 'production' ? production : development;
