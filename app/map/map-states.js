'use strict';

/* @ngInject */
function MapStates($stateProvider) {
    $stateProvider.state({
        name: 'map',
        url: '/map',
        controller: 'mapController',
        template: require('./map.html')
    });
}

module.exports = MapStates;
