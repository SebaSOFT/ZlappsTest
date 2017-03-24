'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const apirouter = require('./router.api');
const path = require('path');
const logger = require('./logger').logger;
const app = express();

// Incoming data types
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// api router
app.use('/api', apirouter);
// error handling
app.use(function(err, req, res, next) {
    logger.error(err.stack);
    next(err);
});
app.use(function(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({
            success: false,
            error: 'Internal Server Error!'
        });
    } else {
        next(err);
    }
});
app.use(function(err, req, res, next) {  //eslint-disable-line no-unused-vars
    res.status(500).send({
        success: false,
        error: err.message
    });
});
// static file serve fallback
app.use(express.static(path.join(__dirname, '../public'), {
    lastModified: true,
    redirect: true
}));

module.exports = app;