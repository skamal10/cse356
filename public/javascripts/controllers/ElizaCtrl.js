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
 				$scope.responses.push(data);
          });

    	// $http.post('/eliza/DOCTOR', $scope.human)
   		// .then(
     //   		function(response){
     //   			$scope.responses.push(response.data);

     //   		},
     //   	 function(response){
     //     		$scope.responses.push("HELLO");
     //   		}
    	//  ); 



    };


   
  });
