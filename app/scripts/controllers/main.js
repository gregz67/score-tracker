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
    $scope.showControls = false;

    // populate list
    $scope.scores = ScoreService.getList();
    // calculate summary
    $scope.summary = ScoreService.getSummary();

    function focusForm() {
      $("#scoreForm").find("input").first().focus();
    }
    focusForm();

    $scope.addScore = function(score) {
      if (ScoreService.create(score)) {
        if ($scope.scoreForm) {
          $scope.scoreForm.$setPristine();
        }
        $scope.newScore = { name: "", value: undefined };
        focusForm();

        $scope.scores = ScoreService.getList();
        $scope.summary = ScoreService.getSummary();
      }
    };

    $scope.removeScore = function(uuid) {
      ScoreService.remove(uuid);

      $scope.scores = ScoreService.getList();
      $scope.summary = ScoreService.getSummary();
    };

    $scope.updateScore = function(score) {
      if (ScoreService.update(score)) {
        $scope.summary = ScoreService.getSummary();
      }
    };
  });
