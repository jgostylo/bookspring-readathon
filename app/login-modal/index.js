'use strict';

require('./login-modal.css');

module.exports = require('angular').module('login-modal', [])
    .controller('loginModalController', require('./login-modal-controller'));
