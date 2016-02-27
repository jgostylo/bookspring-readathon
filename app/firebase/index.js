'use strict';

module.exports = require('angular').module('bsr-firebase', [])
    .factory('bsrFirebase', require('./firebase-factory'));
