'use strict';

/* @ngInject */
function NavController($scope, $translate, $window) {
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.reload();
    };
}

module.exports = NavController;