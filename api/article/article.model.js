'use strict';

const mongoose = require('../mongo');

var articleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        notEmpty: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        notEmpty: true
    },
    tags: [{
        type: String,
        required: true,
        notEmpty: true
    }]
});

module.exports = mongoose.model('Article', articleSchema);