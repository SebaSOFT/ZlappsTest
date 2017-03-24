'use strict';

const config = require('../config');
const loggerSvc = require('./logger');
const logger = loggerSvc.logger;
const app = require('./server');

// HTTP logger
app.use(loggerSvc.httpLogger);

// Starting the server
app.listen(config.server.port, function() {
    logger.info('Node server (' + config.env + ') started successfully, listening on port: ' + config.server.port);
});