'use strict';

angular.module('scoreTrackerApp')
  .directive('score', function(ScoreService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/score.html',
      scope: {
        score: '=',
        updateSummary: '&'
      },
      link: function(scope, element) {
        scope.showControls = false;
        scope.editing = false;
        scope.newScore = angular.copy(scope.score);

        element.parent().bind('mouseenter', function() {
          scope.$apply(function() {
            scope.showControls = true;
          });
        });
        element.parent().bind('mouseleave', function() {
          scope.$apply(function() {
            scope.showControls = false;
          });
        });

        scope.removeScore = function(uuid) {
          ScoreService.remove(uuid);
          element.parent().remove();
          scope.updateSummary();
        };

        scope.updateScore = function(score) {
          if (ScoreService.update(score) && scope.score.value !== score.value) {
            scope.updateSummary();
          }
          scope.score = score;
          scope.editing = false;
        };

        scope.editMode = function() {
          scope.newScore = angular.copy(scope.score);
          scope.editing = true;
        };

        scope.cancel = function() {
          scope.newScore = scope.score;
          scope.editing = false;
        };
      }
    };

  });
