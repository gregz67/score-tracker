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

    $scope.updateList = function() {
      $scope.scores = ScoreService.getList();
    };
    $scope.updateList();

    $scope.addScore = function(score) {
      if (ScoreService.create(score)) {
        if ($scope.scoreForm) {
          $scope.scoreForm.$setPristine();
        }
        $scope.newScore = { name: "", value: undefined };
        $scope.updateList();
        focusForm();
      }
    };

    $scope.$watch('scores', function() {
      $scope.summary = {
        average: Math.round(_.reduce($scope.scores, function(sum, score) {
            return sum + score.value;
          }, 0) / $scope.scores.length) || 0,

        minimum: _.min($scope.scores, function(score) {
          return score.value;
        }).value || 0,

        maximum: _.max($scope.scores, function(score) {
          return score.value;
        }).value || 0
      };
    }, true);

  });
