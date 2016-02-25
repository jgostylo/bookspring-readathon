'use strict';

/* @ngInject */
function LoginStates($stateProvider) {
    $stateProvider.state({
        name: 'login',
        url: '/login',
        controller: 'loginController',
        template: require('./login.html')
    });
}

module.exports = LoginStates;
