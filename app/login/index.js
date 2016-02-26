'use strict';

module.exports = require('angular').module('bsr-login', [])
    .component('login', {
        template: require('./login.html'),
        controller: require('./login-controller')
    });
