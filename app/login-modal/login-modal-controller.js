'use strict';

var angular = require('angular');

/* @ngInject */
function LoginModalController($scope, $window, $uibModalInstance, bsrFirebase, $translate) {

    var isPreviousUser = $window.localStorage.getItem('isUser');

    function handleLogin(error, authData) {
        if (error) {
            console.log(error);
            $scope.form.msgTranslateId = 'login-failed';
            return;
        }
        $uibModalInstance.close(angular.extend(authData, $scope.user));
    }

    function handleRegistration(registrationError, userData) {
        if (registrationError) {
            console.log(registrationError);
            $scope.form.msgTranslateId = 'registration-failed';
            return;
        }
        bsrFirebase.child('users').child(userData.uid).set($scope.registration, function (storageError) {
            if (storageError) {
                console.log(storageError);
                $scope.form.msgTranslateId = 'registration-failed';
            }else {
                $uibModalInstance.close(angular.extend(userData, $scope.registration));
                $window.localStorage.setItem('isUser', true);
            }
        });
    }

    $scope.form = {
        isRegistration: !isPreviousUser,
        msgTranslateId: null
    };

    $scope.registration = {
        email: null,
        zipCode: null
    };

    $scope.user = {
        email: null,
        zipCode: null
    };

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };

    $scope.login = function() {
        bsrFirebase.authWithPassword({
            email : $scope.user.email,
            password : $scope.user.zipCode
        }, handleLogin);
    };

    $scope.register = function() {
        bsrFirebase.createUser({
            email    : $scope.registration.email,
            password : $scope.registration.zipCode
        }, handleRegistration);
    };

}

module.exports = LoginModalController;