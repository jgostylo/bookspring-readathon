'use strict';

/* @ngInject */
function ReadingEntryController($scope) {
    $scope.minutesRead = '15';
    $scope.minutesArray = ["15", "30", "45", "60+"];


    $scope.setTime = function(timeSetting){
      $scope.minutesRead = timeSetting;
    };

    $scope.submitTime = function(){
      console.log("I should be submitting $scope.minutesRead to the database.  Current value is ", $scope.minutesRead);
    };
}

module.exports = ReadingEntryController;