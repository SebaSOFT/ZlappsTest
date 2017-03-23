'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
    it('should add a user on /users POST');
});