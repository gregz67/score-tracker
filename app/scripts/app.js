'use strict';

/**
 * @ngdoc overview
 * @name scoreTrackerApp
 * @description
 * # scoreTrackerApp
 *
 * Main module of the application.
 */
angular
  .module('scoreTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('scoreTrackerApp');
  });
