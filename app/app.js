'use strict';

require('./app.css');
require('./app-cache');
require('./vendor');

// @ngInject
module.exports = require('angular').module('bookspring-readathon', [
    'ui.router',
    'ui.bootstrap',
    require('./home').name,
    require('./login').name,
]).config(
    /* @ngInject */
    function($urlRouterProvider) {
        $urlRouterProvider.otherwise('login');
    }
);

