"use strict";

angular.module("scoreTrackerApp")
  .factory("ScoreService", function(localStorageService, Uuid) {
    var scoresKey = "scores";
    var scores = {};

    function getList() {
      return scores;
    }

    function create(score) {
      if (score.name && typeof score.name === "string" &&
        score.value && typeof score.value === "number") {

        var uuid = Uuid.generate();
        scores[uuid] = score;
        persist();

        return scores[uuid];
      } else {
        return undefined;
      }
    }

    function persist() {
      localStorageService.set(scoresKey, scores);
    }

    return {
      getList: getList,
      create: create
    };
  });
