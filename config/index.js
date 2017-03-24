'use strict';

const common = require('./common');
const logger = require('./logger');
const server = require('./server');
const mongo = require('./mongo');

module.exports = Object.assign({}, common, logger, server, mongo);