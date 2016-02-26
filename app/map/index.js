'use strict';

module.exports = require('angular').module('bsr-map', [])
    .config(require('./map-states'))
    .controller('mapController', require('./map-controller'));
