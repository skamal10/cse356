'use strict';

angular.module('appApp', []).controller('ElizaCtrl', function ($scope, $http) {


	$scope.responses = [];
	$scope.human="";

	$scope.elizaResponse = function(){

		$scope.sendResponse();

	
   	}

   	 $scope.sendResponse = function () {


   	 	 $http({
          method  : 'POST',
          url     : '/eliza/DOCTOR',
          data    : $scope.human, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .success(function(data) {
          		$scope.responses.push( JSON.stringify({ human: $scope.human })); // push the human input first
 				$scope.responses.push(data); // then lets push the eliza response
 				$scope.human=""; // clear the input field after submission
          });
    };
  });
