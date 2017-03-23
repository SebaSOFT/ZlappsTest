'use strict';

const config = {
    logger: {
        level: process.env.LOGGER_LEVEL || 'debug',
        enabled: process.env.LOGGER_ENABLED || true
    }
};

module.exports = config;