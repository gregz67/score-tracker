'use strict';

/**
 * @ngdoc function
 * @name scoreTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scoreTrackerApp
 */
angular.module('scoreTrackerApp')
  .controller('MainCtrl', function ($scope, ScoreService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log(ScoreService.create());
  });
