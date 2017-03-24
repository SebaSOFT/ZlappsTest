'use strict';
const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Users', function() {
    it('should add a user on /api/users POST', function(done) {
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
            res.body.user._id.should.be.a('number');
            done();
        });
    });
});