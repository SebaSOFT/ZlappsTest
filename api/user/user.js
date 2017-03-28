'use strict';

const promise = require('bluebird');
const logger = require('winston');
const val = require('joi');
val.validate = promise.promisify(val.validate);
const User = require('./user.model');

// user validation model
const userModel = val.object().label('User').keys({
    _id: val.string().hex().optional().label('User ID'),
    name: val.string().empty().required().label('User Name'),
    avatar: val.string().uri({
        scheme: ['http', 'https']
    }).empty().required().label('User Avatar')
}).unknown().required();

// User controller
const userController = {
    create: function(req, res) {
        var user = req.body;
        delete user._id;
        val.validate(user, userModel).then(function(value) {
            logger.debug(value);
            var newUser = new User(value);
            newUser.save().then(function(theUser) { // Creation OK!
                logger.debug('User saved: ' + theUser);
                res.json({
                    success: true,
                    message: 'User created!',
                    user: theUser
                });
            }).catch(function(err) { // Save error
                logger.error(err);
                res.status(500).send({
                    success: false,
                    error: err.message
                });
            });
        }).catch(function(err) { // Validation error
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