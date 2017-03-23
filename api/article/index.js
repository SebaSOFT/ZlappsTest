'use strict';

const article = require('./article').controller;

module.exports = {
    create: article.create,
    edit: article.edit,
    delete: article.delete,
    listByTag: article.listByTag
};