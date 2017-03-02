'use strict';

angular.module('appApp', ['ngCookies']).controller('ElizaCtrl', function ($scope, $http, $cookies) {


	$scope.responses = [];
	$scope.human= "";
  $scope.loaded=false;
  $scope.convo_list=[];



	$scope.elizaResponse = function(){

		$scope.sendResponse();
	
   	}

    $scope.printCookies= function(){

        $http({
          method  : 'POST',
          url     : '/eliza/adduser',
          data    : {username: 'skamal' , password: 'testing' , email : 'nyklyfe@gmail.com'}, //forms user object
         })
          .success(function(data) {
              alert(data);
          });




    }


   	$scope.sendResponse = function () {


   	 	 $http({
          method  : 'POST',
          url     : '/DOCTOR',
          data    : { human : $scope.human}, //forms user object
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
          url     : '/new-convo',
          data    : $scope.responses //forms user object
         })
          .success(function(data) {
 				         console.log(data);
          });

    }

    $scope.getConvos = function(){
      $http({
          method  : 'POST',
          url     : '/getconv',
          data    : { id : 0 }
         })
          .success(function(data) {
                 $scope.responses = data.conversation.convo;
                 $scope.loaded=true;
          });
    }

    $scope.listConvos = function() {

         $http({
          method  : 'POST',
          url     : '/listconv'
         })
          .success(function(data) {
              for(var i=0;i<data.conversations.length;i++){

                  var convo = {};
                  convo.id = data.conversations[i]._id;
                  convo.date = new Date(data.conversations[i].date).toString();
                  $scope.convo_list.push( convo );
              }
          });



    }


  });
