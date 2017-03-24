'use strict';
const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const model = require('./user').model;
const val = require('joi');
const logger = require('../logger').logger;

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function() {
    it('should add a valid user on /api/users POST', function(done) {
        var user = {
            name: 'Sebastian',
            avatar: 'https://placehold.it/128.png'
        };
        chai.request(server).post('/api/users').send(user).end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('user');
            res.body.user.should.be.a('object');
            res.body.user.should.have.property('name');
            res.body.user.should.have.property('avatar');
            res.body.user.should.have.property('_id');
            should.not.equal(res.body.user._id, null);
            val.validate(res.body.user,model).catch(function(err){ //eslint-disable-line no-unused-vars
                logger.warn(err);
                should.not.exist(err);
            });
            done();
        });
    });
    it('should NOT add a user on /api/users POST with invalid user input', function(done) {
        var user = {
            name: null,
            avatar: null
        };
        chai.request(server).post('/api/users').send(user).end(function(err, res) {
            res.should.have.status(400);
            res.should.be.json;
            should.exist(err);
            err.should.be.a('error');
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('error');
            done();
        });
    });
});