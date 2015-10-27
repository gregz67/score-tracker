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

    function updateList() {
      $scope.scores = ScoreService.getList();
    }
    updateList();

    $scope.updateSummary = function() {
      $scope.summary = ScoreService.getSummary();
    };
    $scope.updateSummary();

    $scope.addScore = function(score) {
      if (ScoreService.create(score)) {
        if ($scope.scoreForm) {
          $scope.scoreForm.$setPristine();
        }
        $scope.newScore = { name: "", value: undefined };

        updateList();
        $scope.updateSummary();

        focusForm();
      }
    };

  });
