'use strict';

var moment = require('moment');
var _ = require('lodash');

/* @ngInject */
function ReadingEntryController($scope, $rootScope, $window, bsrFirebase, appFactory) {

    var now = moment().utc();
    var startDate = now.subtract(7, 'days').toDate().toJSON();
    var user;
    var consecutiveBadge = 'two-consecutive-days';

    function awardBadge(type) {
        console.log('awarding badge');
        var badge = {
            type: type,
            awarded: moment().utc().toJSON()
        };
        bsrFirebase.child('/users').child(user.uid).child('badges').push(badge);

    }

    function checkConsecutiveDaysAndAward() {
        var now = moment().utc().toJSON();
        var startOfToday = moment().utc().startOf('day').toJSON();

        bsrFirebase.child('users')
            .child(user.uid)
            .child('badges')
            .orderByChild('awarded')
            .startAt(startOfToday)
            .endAt(now)
            .once('value', function (snapshot) {
                console.log('checking for badges');
                var hasBadge = false;
                var hasBadges = _.some(snapshot.val());
                snapshot.forEach(function (badge) {
                    if(badge.val().type === consecutiveBadge) {
                        hasBadge = true;
                    }
                });
                if (!hasBadge || !hasBadges) {
                    awardBadge(consecutiveBadge);
                }
            });
    }

    function determineConsecutiveDays() {
        var yesterday = moment().utc().subtract(1, 'days');
        var startOfYesterday = yesterday.startOf('day').toJSON();
        var endOfYesterday = yesterday.endOf('day').toJSON();
        bsrFirebase.child('entries/users')
            .child(user.uid)
            .orderByChild('submitted')
            .startAt(startOfYesterday)
            .endAt(endOfYesterday)
            .once('value', function (snapshot) {
                if (_.some(snapshot.val())) {
                    // user has entries from yesterday, check and award
                    checkConsecutiveDaysAndAward();
                }
            });
    }

    function createMinutesMap(zipCodesSnapshot) {
        var minutesReadMap = {};
        zipCodesSnapshot.forEach(function (entrySnapshot) {
            var entry = entrySnapshot.val();
            if (minutesReadMap[entry.zipCode]) {
                minutesReadMap[entry.zipCode] += entry.minutesRead;
            }
            else {
                minutesReadMap[entry.zipCode] = entry.minutesRead;
            }
        });
        return minutesReadMap;
    }

    function handleUserSubmission() {
        var now = moment().utc().toDate().toJSON();
        $scope.entry.uid = user.uid;
        $scope.entry.zipCode = user.zipCode;
        $scope.entry.submitted = now;
        determineConsecutiveDays();
        bsrFirebase.child('entries/all').push($scope.entry);
        bsrFirebase.child('entries/users').child(user.uid).push($scope.entry);
    }


    function handleMinutesMapSnapshot(snapshot) {
        var minutesReadMap = createMinutesMap(snapshot);
        $scope.$evalAsync(function(){
            $scope.minutesReadMap = minutesReadMap;
        });
    }

    function fetchMapData() {
        bsrFirebase.child('entries/all')
            .orderByChild('submitted')
            .startAt(startDate)
            .on('value', handleMinutesMapSnapshot);
    }

    function init() {
        user = appFactory.getUser();
        fetchMapData();
    }


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

    $scope.submitTime = handleUserSubmission;

    $rootScope.$on('login', init);

}



module.exports = ReadingEntryController;