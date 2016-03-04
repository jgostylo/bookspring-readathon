'use strict';

/* @ngInject */
function AppController($timeout, $scope, $rootScope, $uibModal, $window, appFactory) {

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
    else {
        $timeout(function () {
            // need time for child controllers to initialize #shameface
            $rootScope.$broadcast('login', $scope.user);
        });
    }
}

module.exports = AppController;