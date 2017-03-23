'use strict';
const promise = require('bluebird');
const logger = require('winston');
const val = require('joi');
promise.promisify(val.validate,{context:val});


// user data model
const userModel = val.object().label('Article').keys({
    _id: val.string().allow([null, '']).default(null).label('Article ID'),
    name: val.string().empty().required().label('User <Name></Name>'),
    avatar: val.string().empty().required().label('User Avatar')
}).unknown().required();

// User controller
const userController = {
    create: function(article) {
        val.validate(article, userModel).then(function(done) {
            logger.log(done);
        }).catch(function(err) {
            logger.log(err);
        });
    }
};

module.exports = userController;