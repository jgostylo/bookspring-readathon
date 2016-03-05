'use strict';

var moment = require('moment');
var _ = require('lodash');

/* @ngInject */
function ReadingEntryController($scope, $rootScope, $filter, $window, bsrFirebase) {

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

    function handleUserSubmission() {
        var now = moment().utc().toDate().toJSON();
        $scope.entry.uid = user.uid;
        $scope.entry.zipCode = user.zipCode;
        $scope.entry.submitted = now;
        determineConsecutiveDays();
        var msg = $filter('translate')('youve-logged-this-much', {minutes: $scope.entry.minutesRead});
        $scope.alerts.push({ type: 'success', msg: msg});
        bsrFirebase.child('entries/all').push($scope.entry);
        bsrFirebase.child('entries/users').child(user.uid).push($scope.entry);
    }

    function init(evt, authedUser) {
        user = authedUser;
    }

    $scope.alerts = [];

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

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $rootScope.$on('login', init);

}



module.exports = ReadingEntryController;