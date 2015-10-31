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
    }
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
      $scope.summary = ScoreService.getSummary();
    }, true);

  });
