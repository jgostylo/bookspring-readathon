'use strict';

var Firebase = require('firebase');

/* @ngInject */
function FirebaseFactory() {
    return new Firebase('https://popping-heat-442.firebaseio.com');
}

module.exports = FirebaseFactory;