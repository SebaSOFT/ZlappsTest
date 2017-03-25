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

    it('should add an article on /articles POST');
    it('should update an article on /articles/<id> PUT');
    it('should list all articles that match a tag on /articles/tag/<tag> GET');
    it('should delete an article on /articles/<id> DELETE');
});