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

res.send(JSON.stringify({ eliza: randomResponse[index] })  );


        $scope.responses.push( JSON.parse('{ "human": "$scope.human" }')); // push the human input first
 				$scope.responses.push(data); // then lets push the eliza response
 				$scope.human=""; // clear the input field after submission
          });
    };

    $scope.saveConvo = function(){
    	$http({
          method  : 'POST',
          url     : '/eliza/new-convo',
          data    : $scope.responses //forms user object
         })
          .success(function(data) {
 				         console.log(data);
          });

    }

    $scope.getConvos = function(){
      $http({
          method  : 'GET',
          url     : '/eliza/getconv/1'
         })
          .success(function(data) {
                 $scope.responses = data.convo;
          });
    }
  });
