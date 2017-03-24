'use strict';

const user = require('./user').controller;

module.exports = {
    create: user.create
};