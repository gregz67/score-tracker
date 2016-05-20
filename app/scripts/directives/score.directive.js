'use strict';

angular.module('scoreTrackerApp')
  .directive('score', function(ScoreService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/score.directive.html',
      scope: {
        score: '=',
        onChange: '&'
      },
      link: function(scope, element) {
        scope.showControls = false;
        scope.editing = false;
        scope.newScore = angular.copy(scope.score);

        element.bind('mouseenter', function() {
          scope.$apply(function() {
            scope.showControls = true;
          });
        });
        element.bind('mouseleave', function() {
          scope.$apply(function() {
            scope.showControls = false;
          });
        });

        scope.removeScore = function(uuid) {
          ScoreService.remove(uuid);
          element.remove();
          if (angular.isFunction(scope.onChange)) {
            scope.onChange();
          }
        };

        scope.updateScore = function(score) {
          // TODO: optimize this if
          if (ScoreService.update(score) && scope.score.value !== score.value) {
            if (angular.isFunction(scope.onChange)) {
              scope.onChange();
            }
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
