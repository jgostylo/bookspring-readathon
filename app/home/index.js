'use strict';

module.exports = require('angular').module('bsr-home', [])
    .config(require('./home-states'))
    .controller('homeController', require('./home-controller'));
