'use strict';

angular.module('appApp', []).controller('ElizaCtrl', function ($scope, $http) {


	$scope.responses = [];
	$scope.human="";

	$scope.elizaResponse = function(){

		$scope.sendResponse();

	
   	}

   	 $scope.sendResponse = function () {

    	$http.post('/eliza/DOCTOR', $scope.human)
   		.then(
       		function(response){
       			$scope.responses.push(response.data);

       		},
       	 function(response){
         		$scope.responses.push("HELLO");
       		}
    	 ); 



    };


   
  });
