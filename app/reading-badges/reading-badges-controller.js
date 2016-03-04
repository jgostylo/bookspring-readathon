'use strict';

var moment = require('moment');

/* @ngInject */
function ReadingBadgesController($scope, $rootScope, bsrFirebase) {

    var user;
    var now = moment().utc();
    var startDate = now.subtract(7, 'days').toDate().toJSON();

    function determineWeeklyBadges(minutesRead) {
        var hours = Math.round(minutesRead / 60);
        $scope.$evalAsync(function(){
            $scope.minutesRead = minutesRead;
            if (hours >= 5) {
                $scope.hasFiveHoursBadge = true;
            }
            if (hours >= 7) {
                $scope.hasSevenHoursBadge = true;
            }
            if (hours >= 10) {
                $scope.hasTenHoursBadge = true;
            }
        });
    }

    function hangleUserMinutesSnapshot(snapshot) {
        var minutesRead = 0;
        var dateStamps = {};
        snapshot.forEach(function (entrySnapshot) {
            var entry = entrySnapshot.val();
            var dateStamp = moment(entry.submitted).utc().format('YYYY-MM-DD');
            dateStamps[dateStamp] = true;
            minutesRead += entry.minutesRead;
        });
        determineWeeklyBadges(minutesRead);
    }

    function fetchAndSubscibeToUsersReadingData() {
        bsrFirebase.child('entries/users')
                .child(user.uid)
                .orderByChild('submitted')
                .startAt(startDate)
                .on('value', hangleUserMinutesSnapshot);

    }

    function getUserBadges() {
        bsrFirebase.child('users')
                .child(user.uid)
                .child('badges')
                .on('value', function (snapshot) {
                    $scope.$evalAsync(function () {
                        $scope.badges = snapshot.val();
                    });

                });

    }

    function init(event, authedUser) {
        user = authedUser;
        fetchAndSubscibeToUsersReadingData();
        getUserBadges();
    }

    $rootScope.$on('login', init);

}

module.exports = ReadingBadgesController;