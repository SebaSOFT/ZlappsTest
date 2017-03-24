'use strict';
const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); //eslint-disable-line no-unused-vars

chai.should();
chai.use(chaiHttp);

describe('Articles', function() {
    it('should add an article on /articles POST');
    it('should update an article on /articles/<id> PUT');
    it('should list all articles that match a tag on /articles/tag/<tag> GET');
    it('should delete an article on /articles/<id> DELETE');
});