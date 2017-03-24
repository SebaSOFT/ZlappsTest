'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const promise = require('bluebird');
const logger = require('./logger').logger;

// Database connection
var options = {
    promiseLibrary: promise
};

// for the MongoDB driver
mongoose.Promise = promise;

// for Mongoose
mongoose.connect(config.mongoURI[config.env], options);

//events
mongoose.connection.on('connected', function() {
    logger.debug('Connected to the DB (' + config.env + ')!');
});

mongoose.connection.on('error', function(err) {
    logger.error(err);
});

mongoose.connection.on('disconnected', function() {
    logger.info('Mongoose default connection disconnected');
});

module.exports = mongoose;