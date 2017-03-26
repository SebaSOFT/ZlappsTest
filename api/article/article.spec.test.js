'use strict';

const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const afterEach = mocha.afterEach;
const beforeEach = mocha.beforeEach;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const model = require('./article').model;
const val = require('joi');
const Article = require('./article.model');

chai.use(chaiHttp);

describe('Articles', function() {

    // Setup
    beforeEach(function(done) {
        Article.collection.remove();
        done();
    });
    afterEach(function(done) {
        Article.collection.remove();
        done();
    });

    it('should add an article on /api/articles POST', function(done) {
        var article = {
            userId: '507f1f77bcf86cd799439011',
            title: 'Has been heroes review',
            text: 'So a warrior, a monk, and a rogue walk onto a battlefield and then... they die. A lot. And then they have to start all over.',
            tags: ['PC', 'XBONE', 'PS4', 'ROGUELIKE']
        };
        chai.request(server).post('/api/articles').send(article).end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('article');
            res.body.article.should.be.a('object');
            res.body.article.should.have.property('_id');
            res.body.article.should.have.property('userId');
            res.body.article.should.have.property('title');
            res.body.article.should.have.property('text');
            res.body.article.should.have.property('tags');
            should.not.equal(res.body.article._id, null);
            val.validate(res.body.article, model).catch(function(err) {
                should.not.exist(err);
                done();
            });
            done();
        });
    });
    it('should list all articles that match a tag on /api/articles/tag/<tag> GET', function(done) {
        var newArticle1 = new Article({
            userId: '507f1f77bcf86cd799439011',
            title: 'TEST-TITLE1',
            text: 'TEST-TEXT1',
            tags: ['PC', 'XBONE', 'PS4', 'ROGUELIKE']
        });
        var newArticle2 = new Article({
            userId: '507f1f77bcf86cd799439011',
            title: 'TEST-TITLE2',
            text: 'TEST-TEXT2',
            tags: ['PC', 'ROGUELIKE']
        });
        var newArticle3 = new Article({
            userId: '507f1f77bcf86cd799439011',
            title: 'TEST-TITLE3',
            text: 'TEST-TEXT3',
            tags: ['PS4', 'ROGUELIKE']
        });
        Article.collection.insert([newArticle1, newArticle2, newArticle3]).then(function(report) {
            console.log(JSON.stringify(articles)); //eslint-disable-line
            var articles = report.ops;
            articles.should.be.a('array');
            articles.should.have.property('length');
            articles.length.should.equal(3);
            chai.request(server).get('/api/articles/tag/' + 'PC').end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('articles');
                res.body.articles.should.be.a('array');
                res.body.articles.should.have.property('length');
                res.body.articles.length.should.equal(2);
                chai.request(server).get('/api/articles/tag/' + 'XBONE').end(function(err, res) {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('articles');
                    res.body.articles.should.be.a('array');
                    res.body.articles.should.have.property('length');
                    res.body.articles.length.should.equal(1);
                    chai.request(server).get('/api/articles/tag/' + 'ROGUELIKE').end(function(err, res) {
                        should.not.exist(err);
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.success.should.equal(true);
                        res.body.should.have.property('articles');
                        res.body.articles.should.be.a('array');
                        res.body.articles.should.have.property('length');
                        res.body.articles.length.should.equal(3);
                        done();
                    });
                });
            });
        }).catch(function(err) {
            should.not.exist(err.message);
            done();
        });
    });
    it('should update an article on /api/articles/<id> PUT', function(done) {
        var newArticle = new Article({
            userId: '507f1f77bcf86cd799439011',
            title: 'Has been heroes review',
            text: 'So a warrior, a monk, and a rogue walk onto a battlefield and then... they die. A lot. And then they have to start all over.',
            tags: ['PC', 'XBONE', 'PS4', 'ROGUELIKE']
        });
        newArticle.save().then(function(theArticle) {
            theArticle.should.have.property('_id');
            should.not.equal(theArticle._id, null);
            var articleEdited = {
                title: 'MODIFIED',
                text: 'MODIFIED',
                tags: ['PC']
            };
            chai.request(server).put('/api/articles/' + theArticle._id).send(articleEdited).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                res.body.should.have.property('article');
                res.body.article.should.be.a('object');
                res.body.article.should.have.property('_id');
                res.body.article.should.have.property('userId');
                res.body.article.should.have.property('title');
                res.body.article.title.should.be.equal('MODIFIED');
                res.body.article.should.have.property('text');
                res.body.article.text.should.be.equal('MODIFIED');
                res.body.article.should.have.property('tags');
                should.not.equal(res.body.article._id, null);
                val.validate(res.body.article, model).catch(function(err) {
                    should.not.exist(err);
                    done();
                });
                done();
            });
        }).catch(function(err) {
            should.not.exist(err);
            done();
        });
    });
    it('should delete an article on /api/articles/<id> DELETE', function(done) {
        var newArticle = new Article({
            userId: '507f1f77bcf86cd799439011',
            title: 'Has been heroes review',
            text: 'So a warrior, a monk, and a rogue walk onto a battlefield and then... they die. A lot. And then they have to start all over.',
            tags: ['PC', 'XBONE', 'PS4', 'ROGUELIKE']
        });
        newArticle.save().then(function(theArticle) {
            theArticle.should.have.property('_id');
            should.not.equal(theArticle._id, null);
            chai.request(server).delete('/api/articles/' + theArticle._id).end(function(err, res) {
                should.not.exist(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                Article.findOne({
                    _id: theArticle._id
                }).then(function(obj) {
                    should.not.exist(obj);
                    done();
                }).catch(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        }).catch(function(err) {
            should.not.exist(err);
            done();
        });
    });
});