'use strict';

module.exports = require('angular').module('bsr-reading-entry', [])
    .component('readingEntry', {
        template: require('./reading-entry.html'),
        controller: require('./reading-entry-controller')
    });
