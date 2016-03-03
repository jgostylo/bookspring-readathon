'use strict';

/* @ngInject */
function AppController($scope, $uibModal, $window, appFactory) {

    $scope.user = appFactory.getUser();

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
            appFactory.setUser(user);
        }).catch(showLoginModal);
    }

    if (!$scope.user) {
        showLoginModal();
    }
}

module.exports = AppController;