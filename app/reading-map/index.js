'use strict';
require('./reading-map.css');
module.exports = require('angular').module('bsr-reading-map', [])
    .factory('readingMapFactory', require('./reading-map-factory'))
    .component('readingMap', {
        template: require('./reading-map.html'),
        controller: require('./reading-map-controller')
    });
