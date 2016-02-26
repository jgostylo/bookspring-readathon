'use strict';

/* @ngInject */
function ReadingBadgesController($scope) {
    $scope.hasFiveHoursBadge = true;
    $scope.hasSevenHoursBadge = true;
    $scope.hasTenHoursBadge = true;
    $scope.hasTwoConsecutiveDaysBadge = true;
}

module.exports = ReadingBadgesController;