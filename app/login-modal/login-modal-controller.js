'use strict';

/* @ngInject */
function LoginModalController($scope, $uibModalInstance, bsrFirebase, $translate) {
    $scope.registration = {
        mode: false,
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
        }, function(error, authData) {
            if (error) {
                console.log('Authentication Failed.');
            } else {
                console.log('Authenticated successfully with payload:', authData.uid);
            }
            $uibModalInstance.close(authData);

        });
    };

    $scope.register = function() {
        bsrFirebase.createUser({
            email    : $scope.registration.email,
            password : $scope.registration.zipCode
        }, function(error, userData) {
            if (error) {
                console.log('Error creating user:', error);
            } else {
                console.log($scope.registration.email , ' Successfully created user account with uid:', userData.uid);
            }
            $uibModalInstance.close(userData);
        });
    };

}

module.exports = LoginModalController;