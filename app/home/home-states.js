'use strict';

/* @ngInject */
function HomeStates($stateProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/home',
        controller: 'homeController',
        template: require('./home.html')
    });
}

module.exports = HomeStates;
