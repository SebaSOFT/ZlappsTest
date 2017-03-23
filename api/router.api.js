'use strict';
const express = require('express');
const router = express.Router();

// API domains
const user = require('./user');
const article = require('./article');

// API endpoints
// /articles
router.post('/articles', article.create);
router.put('/articles/:id', article.edit);
router.delete('/articles/:id', article.delete);
router.get('/articles/tag/:tag', article.listByTag);
// /users
router.post('/users', user.create);

module.exports = router;