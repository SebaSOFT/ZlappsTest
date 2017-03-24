'use strict';
const promise = require('bluebird');
const logger = require('winston');
const val = require('joi');
val.validate = promise.promisify(val.validate);


// user data model
const userModel = val.object().label('Article').keys({
    _id: val.string().allow([null, '']).default(null).label('Article ID'),
    name: val.string().empty().required().label('User Name'),
    avatar: val.string().uri({scheme:['http','https']}).empty().required().label('User Avatar')
}).unknown().required();

// User controller
const userController = {
    create: function(req,res) {
        var article = req.body;
        val.validate(article, userModel)
        .then(function(value) {
            logger.info(value);
            value._id = 1;
            res.json({
                success: true,
                message: 'User created!',
                user: value
            });
        }).catch(function(err) {
            logger.error(err.message);
            res.status(400).send({
                success: false,
                error: err
            });
        });
    }
};

module.exports = userController;