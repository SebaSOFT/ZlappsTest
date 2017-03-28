'use strict';

const promise = require('bluebird');
const logger = require('winston');
const val = require('joi');
val.validate = promise.promisify(val.validate);
const Article = require('./article.model');

// article data model
const articleModel = val.object().label('Article').keys({
    _id: val.string().hex().optional().label('Article ID'),
    userId: val.string().hex().required().label('Author ID'),
    title: val.string().empty().required().label('Article Title'),
    text: val.string().empty().required().label('Article Text'),
    tags: val.array().items(val.string().empty().required().uppercase()).label('Article Tags')
}).unknown().required();
const editableArticleModel = val.object().label('Article').keys({
    _id: val.string().hex().optional().label('Article ID'),
    userId: val.string().hex().optional().label('Author ID'),
    title: val.string().empty().optional().label('Article Title'),
    text: val.string().empty().optional().label('Article Text'),
    tags: val.array().items(val.string().empty().required().uppercase()).optional().label('Article Tags')
}).unknown().required();

// article controller
const articleController = {
    create: function(req, res) {
        var article = req.body;
        delete article._id;
        val.validate(article, articleModel).then(function(value) {
            logger.debug(value);
            var newArticle = new Article(value);
            newArticle.save().then(function(theArticle) { // Creation OK!
                logger.debug('Article saved: ' + theArticle);
                res.json({
                    success: true,
                    message: 'Article created!',
                    article: theArticle
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
    },
    edit: function(req, res) {
        var article = req.body;
        var id = req.params.id;
        delete article._id;
        val.validate(article, editableArticleModel).then(function(value) {
            logger.debug(value);
            Article.update({
                _id: id
            }, value).then(function(report) {
                logger.debug(report);
                Article.findOne({
                    _id: id
                }).then(function(editedArticle) {
                    res.json({
                        success: true,
                        message: 'Article edited!',
                        article: editedArticle
                    });
                }).catch(function(err) {
                    logger.error(err);
                    res.status(500).send({
                        success: false,
                        error: err.message
                    });
                });
            }).catch(function(err) {
                logger.error(err);
                res.status(404).send({
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
    },
    delete: function(req, res) {
        var id = req.params.id;
        Article.findOne({
            _id: id
        }).then(function(theArticle) {
            theArticle.remove().then(function(report) {
                logger.debug(report);
                res.json({
                    success: true,
                    message: 'Article deleted!'
                });
            }).catch(function(err) {
                logger.error(err.message);
                res.status(500).send({
                    success: false,
                    error: err.message
                });
            });
        }).catch(function(err) {
            logger.error(err);
            res.status(404).send({
                success: false,
                error: err.message
            });
        });
    },
    listByTag: function(req, res) {
        var tag = req.params.tag;
        val.validate(tag, val.string().empty().required().uppercase().label('Tag')).then(function(value) {
            Article.find({
                tags: value
            }).then(function(result) {
                logger.debug(result);
                res.json({
                    success: true,
                    message: result.length + ' results',
                    articles: result
                });
            }).catch(function(err) {
                logger.error(err);
                res.status(500).send({
                    success: false,
                    error: err.message
                });
            });
        }).catch(function(err) {
            logger.error(err);
            res.status(400).send({
                success: false,
                error: err.message
            });
        });
    }
};

module.exports = {
    model: articleModel,
    controller: articleController
};