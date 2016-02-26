'use strict';

require('./app.css');
require('./app-cache');
require('./vendor');

// @ngInject
module.exports = require('angular').module('bookspring-readathon', [
    'ui.router',
    'ui.bootstrap',
    require('./nav').name,
    require('./home').name,
    require('./login').name,
    require('./map').name,
    require('./translations').name,
]).config(
    /* @ngInject */
    function($urlRouterProvider) {
        $urlRouterProvider.otherwise('login');
    }
);

