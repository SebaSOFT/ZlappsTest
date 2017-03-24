'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); //eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('API Documentation', function() {
    it('should should provide a Swagger definition json on /api/api-docs.json GET');
    it('should should provide a documentation page on /docs GET');
});