'use strict';

/* @ngInject */
function AppController($scope, $uibModal) {

    function showLoginModal() {
        var modalInstance = $uibModal.open({
            template: require('./login-modal/login-modal.html'),
            controller: 'loginModalController'
        });

        modalInstance.result.then(function () {
            console.log('done');
        });
    }

    showLoginModal();

}

module.exports = AppController;