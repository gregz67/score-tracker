'use strict';

/**
 * @ngdoc function
 * @name scoreTrackerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the scoreTrackerApp
 */
angular.module('scoreTrackerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
