'use strict';

const winston = require('winston');

const options = {
  level: 'info',
  prettyPrint: true,
  colorize: true,
};

module.exports = new winston.Logger({
  transports: [
    new (winston.transports.Console)(options),
  ]
});
