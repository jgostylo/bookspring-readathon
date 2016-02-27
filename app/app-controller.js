'use strict';

/* @ngInject */
function AppController($scope, $uibModal, $window) {

    $scope.user = $window.sessionStorage.getItem('bsr-auth');

    function showLoginModal() {
        var modalInstance = $uibModal.open({
            template: require('./login-modal/login-modal.html'),
            controller: 'loginModalController',
            // user must login. prevent from closing
            backdrop : 'static',
            keyboard: false
        });

        modalInstance.result.then(function (user) {
            $scope.user = user;
            $window.sessionStorage.setItem('bsr-auth', JSON.stringify(user));
        }).catch(showLoginModal);
    }

    if (!$scope.user) {
        showLoginModal();
    }
}

module.exports = AppController;