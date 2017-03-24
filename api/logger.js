'use strict';
const config = require('../config');
const logger = require('winston');
const path = require('path');
const morgan = require('morgan');
// logger setup
logger.level = config.logger.level;
logger.add(logger.transports.File, {
    filename: path.join(__dirname, '../logs') + '/api.' + config.env + '.log',
    level: config.logger.level
});
// add morgan to the server to log HTTP requests/responses
logger.stream = {
    write: function(message, encoding) { //eslint-disable-line no-unused-vars
        logger.info(message);
    }
};
// HTTP request logger
var httpLogger = morgan('combined', {
    stream: logger.stream
});

// no console in prod and test
if (config.env != 'development') {
    logger.remove(logger.transports.Console);
}

module.exports = {
    logger: logger,
    httpLogger: httpLogger
};