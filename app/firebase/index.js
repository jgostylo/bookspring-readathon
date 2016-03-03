'use strict';

module.exports = require('angular').module('bsr-firebase', [])
    .constant('firebaseURL', 'https://popping-heat-442.firebaseio.com')
    .factory('bsrFirebase', require('./firebase-factory'));
