'use strict';

const express = require('express');
const bodyParser  = require('body-parser');
const apirouter = require('./router.api');
const path = require('path');

const app = express();

// Incoming data types
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

// api router
app.use('/api',apirouter);

// static file serve fallback
app.use(express.static(path.join(__dirname, '../public'),{
    lastModified:true,
    redirect: true
}));

module.exports = app;