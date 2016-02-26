'use strict';

var Firebase = require('firebase');

/* @ngInject */
function AppController($scope) {
    new Firebase('https://popping-heat-442.firebaseio.com');
}

module.exports = AppController;