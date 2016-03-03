'use strict';

var moment = require('moment');

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

    var now = moment().utc();
    var startDate = now.subtract(7, 'days').toDate().toJSON();

    bsrFirebase.child('entries/all').orderByChild('submitted').startAt(startDate).on('value', function(dataSnapshot) {
        var minutesReadMap = {};
        dataSnapshot.forEach(function (entrySnapshot) {
            var entry = entrySnapshot.val();
            if (minutesReadMap[entry.zipCode]) {
                minutesReadMap[entry.zipCode] += entry.minutesRead;
            }
            else {
                minutesReadMap[entry.zipCode] = entry.minutesRead;
            }
        });
        $scope.$evalAsync(function(){
            $scope.minutesReadMap = minutesReadMap;
        });
    });

    var user = appFactory.getUser();
    bsrFirebase.child('entries/users').child(user.uid).orderByChild('submitted').startAt(startDate).on('value', function(dataSnapshot) {
        var minutesRead = 0;
        dataSnapshot.forEach(function (entrySnapshot) {
            var entry = entrySnapshot.val();
            minutesRead += entry.minutesRead;
        });
        $scope.$evalAsync(function(){
            $scope.minutesRead = minutesRead;
        });
    });


    $scope.submitTime = function(){
        var user = appFactory.getUser();
        var now = moment().utc().toDate().toJSON();

        $scope.entry.uid = user.uid;
        $scope.entry.zipCode = user.zipCode;
        $scope.entry.submitted = now;

        bsrFirebase.child('entries/all').push($scope.entry, function (error) {
            console.log(error);
        });

        bsrFirebase.child('entries/users').child(user.uid).push($scope.entry, function (error) {
            console.log(error);
        });

    };
}



module.exports = ReadingEntryController;