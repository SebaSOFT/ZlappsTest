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
        var article = req.body;
        val.validate(article, userModel).then(function(value) {
            logger.debug(value);
            var newUser = new User(value);
            newUser.save(function(err, theUser) {
                if (err) {
                    logger.error(err);
                    res.status(400).send({
                        success: false,
                        error: err.message
                    });
                } else {
                    logger.debug('User saved: ' + theUser);
                    res.json({
                        success: true,
                        message: 'User created!',
                        user: theUser
                    });
                }
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