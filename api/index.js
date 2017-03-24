'use strict';
const config = require('../config');
const loggerSvc = require('./logger');
const logger = loggerSvc.logger;
const app = require('./server');
const mongoose = require('mongoose');
const promise = require('bluebird');

// Database connection
var options = { promiseLibrary: promise }; // for the MongoDB driver
mongoose.Promise = promise; // for Mongoose
mongoose.connect(config.mongoURI[config.env], options);

// HTTP logger
app.use(loggerSvc.httpLogger);
// Starting the server
app.listen(config.server.port, function() {
    logger.info('Node server (' + config.env + ') started successfully, listening on port: ' + config.server.port);
});