'use strict';

const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const afterEach = mocha.afterEach;
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
    Article.remove({});
    afterEach(function(done) {
        Article.remove({});
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
    it('should list all articles that match a tag on /api/articles/tag/<tag> GET');
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
    it('should delete an article on /api/articles/<id> DELETE');
});