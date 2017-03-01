'use strict';

angular.module('appApp', []).controller('ElizaCtrl', function ($scope, $http) {


	$scope.responses = [];
	$scope.human= "";
  $scope.loaded=false;
  $scope.convo_list=[];


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

        $scope.responses.push( {"human" : $scope.human} ); // push the human input first
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
          method  : 'POST',
          url     : '/eliza/getconv/',
          data    : { id : 0 }
         })
          .success(function(data) {
                 $scope.responses = data.convo;
                 console.log(data.convo);
                 $scope.loaded=true;
          });
    }

    $scope.listConvos = function() {

         $http({
          method  : 'GET',
          url     : '/eliza/listconv'
         })
          .success(function(data) {
              for(var i=0;i<data.length;i++){

                  var convo = {};
                  convo.id = data[i].convo_id;
                  convo.date = new Date(data[i].date).toString();
                  $scope.convo_list.push( convo );
              }
          });



    }
  });
