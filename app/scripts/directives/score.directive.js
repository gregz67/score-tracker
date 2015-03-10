'use strict';

angular.module('scoreTrackerApp')
  .directive('score', function(ScoreService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/score.html',
      scope: {
        score: '=',
        update: '&'
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
          scope.update();
        };

        scope.updateScore = function(score) {
          if (ScoreService.update(score)) {
            scope.update();
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
