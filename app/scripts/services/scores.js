'use strict';

angular.module('scoreTrackerApp')
  .factory('ScoreService', function(localStorageService, Uuid) {
    var scoresKey = 'scores';
    var scores = {};

    function getList() {
      return scores;
    }

    function create() {
      return Uuid.generate();
    }
    //function create(score) {
    //  if (score.name && typeof score.name === 'string' &&
    //    score.value && typeof score.value === 'number') {
    //
    //    scores[Uuid.generate()] = score;
    //    persist();
    //  }
    //}

    function persist() {
      localStorageService.set(scoresKey, scores);
    }

    return {
      getList: getList,
      create: create
    };
  });
