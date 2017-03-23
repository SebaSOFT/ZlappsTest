'use strict';

const article = require('./article');

module.exports = {
    create: article.create,
    edit: article.edit,
    delete: article.delete
};