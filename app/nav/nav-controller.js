'use strict';

/* @ngInject */
function NavController($scope, $translate) {
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
}

module.exports = NavController;