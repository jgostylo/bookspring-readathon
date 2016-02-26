'use strict';

module.exports = require('angular').module('bsr-nav', [])
    .component('nav', {
        template: require('./nav.html'),
        controller: require('./nav-controller')
    });
