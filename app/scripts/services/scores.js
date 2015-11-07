"use strict";

angular.module("scoreTrackerApp")
  .factory("ScoreService", function(localStorageService, Uuid) {
    var scoresKey = "scores", scores = [];

    function getList() {
      if (_.isEmpty(scores)) {
        scores = localStorageService.get(scoresKey) || [];
      }
      return _.sortBy(scores, "name");
    }

    function create(score) {
      if (valid(score)) {

        score.uuid = Uuid.generate();
        scores.push(score);
        persist();

        return score;
      }
    }

    function remove(uuid) {
      _.remove(scores, function(score) {
        return score.uuid === uuid;
      });
      persist();
    }

    function update(newScore) {
      if (valid(newScore)) {
        var scoreIndex = _.findIndex(scores, function(score) {
          return score.uuid === newScore.uuid;
        });
        scores[scoreIndex] = newScore;
        persist();
        return newScore;
      }
    }

    function persist() {
      localStorageService.set(scoresKey, scores);
    }

    function getStatistics() {
      return {
        average: Math.round(_.reduce(scores, function(sum, score) {
            return sum + score.value;
          }, 0) / scores.length) || 0,

        minimum: _.min(scores, function(score) {
          return score.value;
        }).value || 0,

        maximum: _.max(scores, function(score) {
          return score.value;
        }).value || 0
      };
    }

    function valid(score) {
      return (angular.isString(score.name) && angular.isNumber(score.value));
    }

    return {
      create: create,
      getList: getList,
      update: update,
      remove: remove,
      getStatistics: getStatistics
    };
  });
