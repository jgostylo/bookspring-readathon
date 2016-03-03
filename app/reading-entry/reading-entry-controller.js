'use strict';

/* @ngInject */
function ReadingEntryController($scope, $window, bsrFirebase, appFactory) {

    $scope.entry = {
        minutesRead: 15,
    };

    $scope.minutesArray = [15, 30, 45, 60, 75, 90, 105, 120];

    $scope.setTime = function(timeSetting){
        $scope.entry.minutesRead = timeSetting;
    };

    $scope.form = {
        msg: null,
        isLoading: false
    };

    $scope.submitTime = function(){
        var user = appFactory.getUser();
        $scope.entry.uid = user.uid;
        $scope.entry.zipCode = user.zipCode;
        $scope.entry.submitted = new Date().getTime();
        console.log('I should be submitting $scope.minutesRead to the database.  Current value is ', $scope.entry.minutesRead);
        bsrFirebase.child('entries').push($scope.entry, function (error) {
            console.log(error);
        });
    };
}

module.exports = ReadingEntryController;