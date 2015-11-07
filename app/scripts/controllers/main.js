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

    function focusForm() {
      $("#scoreForm").find("input").first().focus();
    }
    focusForm();

    $scope.update = function() {
      $scope.scores = ScoreService.getList();
      $scope.statistics = ScoreService.getStatistics();
    };
    $scope.update();

    $scope.addScore = function(score) {
      if (ScoreService.create(score)) {
        if ($scope.scoreForm) {
          $scope.scoreForm.$setPristine();
        }
        $scope.newScore = { name: "", value: undefined };
        $scope.update();
        focusForm();
      }
    };

  });
