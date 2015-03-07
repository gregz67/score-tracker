"use strict";

angular.module("scoreTrackerApp")
  .factory("ScoreService", function(localStorageService, Uuid) {
    var scoresKey = "scores";
    var scores = [];

    function getList() {
      if (_.isEmpty(scores)) {
        scores = localStorageService.get(scoresKey) || [];
      }
      return _.sortBy(scores, "name");
    }

    function create(score) {
      if (score.name && typeof score.name === "string" &&
        score.value && typeof score.value === "number") {

        score.uuid = Uuid.generate();
        scores.push(score);
        persist();

        return score;
      } else {
        return undefined;
      }
    }

    function remove(uuid) {
      _.remove(scores, function(score) {
        return score.uuid === uuid;
      });
      persist();
    }

    function update(updatedScore) {
      persist();
    }

    function persist() {
      localStorageService.set(scoresKey, scores);
    }

    return {
      create: create,
      getList: getList,
      update: update,
      remove: remove
    };
  });
