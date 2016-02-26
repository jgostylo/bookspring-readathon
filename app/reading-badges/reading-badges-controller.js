'use strict';

/* @ngInject */
function ReadingBadgesController($scope) {
    $scope.hasFiveHoursBadge = true;
    $scope.hasSevendHoursBadge = true;
    $scope.hasTenHoursBadge = true;
    $scope.hasTwoConsecutiveDaysBadge = true;
}

module.exports = ReadingBadgesController;