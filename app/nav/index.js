'use strict';

module.exports = require('angular').module('nav', [])
    .component('nav', {
        template: require('./nav.html'),
        controller: require('./nav-controller')
    });
