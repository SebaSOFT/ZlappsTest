'use strict';

const config = {
    logLevel: {
        development: process.env.LOGGER_LEVEL ? process.env.LOGGER_LEVEL : 'debug',
        test: process.env.LOGGER_LEVEL ? process.env.LOGGER_LEVEL : 'info',
        production: process.env.LOGGER_LEVEL ? process.env.LOGGER_LEVEL : 'info'
    }
};

module.exports = config;