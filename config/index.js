'use strict';

const common = require('./common');
const logger = require('./logger');
const server = require('./server');

module.exports = Object.assign({}, common, logger, server);