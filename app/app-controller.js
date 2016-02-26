'use strict';

/* @ngInject */
function AppController($scope) {
	$scope.user = null;
	$scope.firebaseRef = new Firebase('https://popping-heat-442.firebaseio.com');
	
	$scope.login = function(user) {

		$scope.firebaseRef.authWithPassword({
			email : $scope.user.email,
			password : $scope.user.zipCode
		}, function(error, authData) {
			if (error) {
				console.log("Authentication Failed.");
			} else {
				console.log("Authenticated successfully with payload:",
						authData.uid);
			}
		});
	}
	
	$scope.createUser = function(user) {
		var firebaseURL = 'https://popping-heat-442.firebaseio.com'
		var firebase = new Firebase(firebaseURL);

		$scope.firebaseRef.createUser({
			  email    : $scope.user.baseEmail,
			  password : $scope.user.baseZipCode
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log($scope.user.baseEmail , " Successfully created user account with uid:", userData.uid);
			  }
			});
	}

}

module.exports = AppController;