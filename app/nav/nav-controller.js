'use strict';

/* @ngInject */
function NavController($scope, $translate, $window, bsrFirebase) {
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    $scope.logout = function () {
        bsrFirebase.unauth();
        $window.sessionStorage.clear();
        $window.location.reload();
    };
}

module.exports = NavController;