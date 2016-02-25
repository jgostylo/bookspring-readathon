'use strict';

module.exports = require('angular').module('bsr-login', [])
    .config(require('./login-states'))
    .controller('loginController', require('./login-controller'));
