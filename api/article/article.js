'use strict';

const promise = require('bluebird');
const logger = require('winston');
const val = require('joi');
val.validate = promise.promisify(val.validate);

// article data model
const articleModel = val.object().label('Article').keys({
    _id: val.string().hex().optional().label('Article ID'),
    userId: val.number().integer().positive().required().label('User ID'),
    title: val.string().empty().required().label('Article Title'),
    text: val.string().empty().required().label('Article Text'),
    tags: val.array().items(val.string().empty().required()).label('Article Tags')
}).unknown().required();

// article controller
const articleController = {
    create: function(article) {
        val.validate(article, articleModel).then(function(done) {
            logger.log(done);
        }).catch(function(err) {
            logger.log(err);
        });
    },
    edit: function(article) {
        logger.log(article);
    },
    delete: function(id) {
        logger.log(id);
    },
    listByTag: function(tag) {
        logger.log(tag);
    }
};

module.exports = {
    model: articleModel,
    controller: articleController
};