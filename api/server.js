'use strict';

const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const apirouter = require('./router.api');
const path = require('path');
const logger = require('./logger').logger;
const app = express();
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

// static file serve fallback
app.use(express.static(path.join(__dirname, '../public'), {
    lastModified: true,
    redirect: true
}));

// Incoming data types
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Setup authentication
app.use(passport.initialize());
passport.use(new BearerStrategy(function(token, done) {
    logger.debug(token);
    var found = false;
    // Look for API key in our configuration, here it could be a DB query
    for (var i = 0; i < config.apikeys.length; i++) {
        if (config.apikeys[i] == token) {
            found = token;
            break;
        }
    }
    logger.debug('Found: ' + found);
    done(null, found);
}));
passport.unuse('session');
// api router
app.use('/api', passport.authenticate('bearer', {
    session: false
}), apirouter);

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
app.use(function(err, req, res, next) { //eslint-disable-line no-unused-vars
    res.status(500).send({
        success: false,
        error: err.message
    });
});

module.exports = app;