'use strict';

const http = require('http');
const config = require('../config');
const server = require('./server');
const logger = require('winston');
const promise = require('bluebird');

logger.level = config.logger.level;
logger.add(logger.transports.File, { filename: './log/'+config.env+'.log', level: config.logger.level });
if (config.env != 'development') {
    logger.remove(logger.transports.Console);
}

