'use strict';


angular.
module('myApp', ['ngCookies']).
  config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'views/index.ejs',
        controller: 'HomeCtrl'
      })
      .when('/eliza', {
        templateUrl:'views/eliza.ejs',
        controller: 'ElizaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



