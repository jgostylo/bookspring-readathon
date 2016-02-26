'use strict';

module.exports = require('angular').module('bsr-translations', [
        'pascalprecht.translate'
    ])
    .config(require('./translations-config'));
