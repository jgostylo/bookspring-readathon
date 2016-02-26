'use strict';
require('./reading-map.css');
module.exports = require('angular').module('bsr-reading-map', [])
    .component('readingMap', {
        template: require('./reading-map.html'),
        controller: require('./reading-map-controller')
    });
