'use strict';

const config = {
    mongoURI: {
        development: 'mongodb://localhost/zlapps-dev',
        test: 'mongodb://localhost/zlapps-test',
        production: 'mongodb://localhost/zlapps-prod'
    }
};

module.exports = config;