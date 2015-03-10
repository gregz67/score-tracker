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

    // updates from score service
    $scope.update = function() {
      // populate list
      $scope.scores = ScoreService.getList();
      // calculate summary
      $scope.summary = ScoreService.getSummary();
    }
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
