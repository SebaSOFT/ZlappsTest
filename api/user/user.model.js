'use strict';

const mongoose = require('../mongo');

var userSchema = new mongoose.Schema({
    name: String,
    avatar: String
});

module.exports = mongoose.model('User', userSchema);