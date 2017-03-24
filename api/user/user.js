'use strict';
const promise = require('bluebird');
const logger = require('winston');
const val = require('joi');
val.validate = promise.promisify(val.validate);
//const User = require('./user.model');
const mongoose = require('mongoose');
// user data model
const userModel = val.object().label('Article').keys({
    _id: val.string().hex().allow([null, '']).default(null).label('Article ID'),
    name: val.string().empty().required().label('User Name'),
    avatar: val.string().uri({
        scheme: ['http', 'https']
    }).empty().required().label('User Avatar')
}).unknown().required();
// User controller
const userController = {
    create: function(req, res) {
        var article = req.body;
        val.validate(article, userModel).then(function(value) {
            logger.debug(value);
            value._id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
            res.json({
                success: true,
                message: 'User created!',
                user: value
            });
        }).catch(function(err) {
            logger.error(err.message);
            res.status(400).send({
                success: false,
                error: err.message
            });
        });
    }
};
module.exports = {
    model: userModel,
    controller: userController
};