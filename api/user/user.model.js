'use strict';

const mongoose = require('../mongo');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        notEmpty: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true,
        notEmpty: true
    }
});

module.exports = mongoose.model('User', userSchema);