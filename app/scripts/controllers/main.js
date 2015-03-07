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

    // populate list
    $scope.scores = ScoreService.getList();

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
      }
    };

    $scope.removeScore = function(uuid) {
      ScoreService.remove(uuid);

      $scope.scores = ScoreService.getList();
    };

    $scope.updateScore = function(uuid) {
      console.log("update " + uuid);
    };

  });
