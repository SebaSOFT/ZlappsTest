'use strict';
const config = require('../config');
const app = require('./server');
const logger = require('winston');
const httpLogger = require('morgan');
// logger setup
logger.level = config.logger.level;
logger.add(logger.transports.File, {
    filename: '../log/api.' + config.env + '.log',
    level: config.logger.level
});
if (config.env != 'development') {
    logger.remove(logger.transports.Console);
}
// add morgan to the server to log HTTP requests/responses
logger.stream = {
    write: function(message, encoding) { //eslint-disable-line no-unused-vars
        logger.info(message);
    }
};
app.use(httpLogger('combined', {
    stream: logger.stream
}));
// Starting the server
app.listen(config.server.port, function() {
    logger.info('Node server (' + config.env + ') started successfully, listening on port: ' + config.server.port);
});