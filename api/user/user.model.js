'use strict';

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    avatar: String
});

module.exports = mongoose.model('User', userSchema);