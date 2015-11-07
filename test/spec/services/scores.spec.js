"use strict";

describe("ScoreService", function() {
  var ScoreService, localStorageService;

  beforeEach(module("scoreTrackerApp"));
  beforeEach(inject(function(_ScoreService_, _localStorageService_) {
    ScoreService = _ScoreService_;
    localStorageService = _localStorageService_;
  }));

  describe("create", function() {
    var userProvidedScore = {
      name: "Greg",
      value: 100
    };

    it("returns a score with name and value set", function() {
      var result = ScoreService.create(userProvidedScore);

      expect(result.name).toEqual(userProvidedScore.name);
      expect(result.value).toEqual(userProvidedScore.value);
    });

    it("persists score to local storage", function() {
      spyOn(localStorageService, "set");
      var result = ScoreService.create(userProvidedScore);

      expect(localStorageService.set).toHaveBeenCalledWith("scores", [userProvidedScore]);
      expect(result).toEqual(userProvidedScore);
    });

    it("returns undefined when user input is not valid", function() {
      var invalidScore = {name: false, value: false};
      var result = ScoreService.create(invalidScore);

      expect(result).toBeUndefined();
    });

    it("supports a zero value in the score", function() {
      var zeroValueScore = {name: "Bob", value: 0};

      var result = ScoreService.create(zeroValueScore);

      expect(result).toBeDefined();
    });
  });

  it("gets list of scores", function() {
    spyOn(localStorageService, "get");
    var result = ScoreService.getList();

    expect(localStorageService.get).toHaveBeenCalledWith("scores");
    expect(angular.isArray(result)).toBeTruthy();
  });

  it("removes a score based on key", function() {
    spyOn(localStorageService, "set");

    ScoreService.create({
      name: "Bob",
      value: 0
    });
    ScoreService.create({
      name: "Sue",
      value: 50
    });
    ScoreService.create({
      name: "Star",
      value: 100
    });
    var initialScores = ScoreService.getList();
    expect(initialScores.length).toEqual(3);

    ScoreService.remove(initialScores[0].uuid);

    expect(localStorageService.set).toHaveBeenCalled();
    expect(ScoreService.getList().length).toEqual(2);
  });

  describe("update", function() {
    var uuid,
      invalidScore = {
        name: false,
        value: false,
        uuid: uuid
      };
    beforeEach(function() {
      ScoreService.create({
        name: "Greg",
        value: 100
      });
      uuid = ScoreService.getList()[0].uuid;
    });

    it("updates a score", function() {
      var userUpdatedScore = {
        name: "Greg",
        value: 99,
        uuid: uuid
      };
      spyOn(localStorageService, "set");
      var result = ScoreService.update(userUpdatedScore);

      expect(localStorageService.set).toHaveBeenCalled();
      expect(result).toEqual(userUpdatedScore);
      expect(ScoreService.getList()).toEqual([userUpdatedScore]);
    });

    it("returns undefined when user input is not valid", function() {
      expect(ScoreService.update(invalidScore)).toBeUndefined();
    });

    it("does not update with an invalid score", function() {
      var scores = ScoreService.getList();

      ScoreService.update(invalidScore);
      expect(ScoreService.getList()).toEqual(scores);
    });
  });

  describe("summary statistics", function() {
    var scores;

    beforeEach(function() {
      ScoreService.create({
        name: "Bob",
        value: 0
      });
      ScoreService.create({
        name: "Sue",
        value: 50
      });
      ScoreService.create({
        name: "Star",
        value: 100
      });
      scores = ScoreService.getList();
    });

    it("calculates for new scores", function() {
      expect(ScoreService.getStatistics()).toEqual({
        minimum: 0,
        maximum: 100,
        average: 50
      });
    });

    it("calculates for updated scores", function() {
      var zeroScoreIndex = _.findIndex(scores, function(score) {
          return score.value === 0;
        }),
        zeroScore = scores[zeroScoreIndex];

      ScoreService.update({
        uuid: zeroScore.uuid,
        name: zeroScore.name,
        value: 75
      });

      expect(ScoreService.getStatistics()).toEqual({
        minimum: 50,
        maximum: 100,
        average: 75
      });
    });

    it("calculates for removed scores", function() {
      var zeroScoreIndex = _.findIndex(scores, function(score) {
          return score.value === 0;
        }),
        zeroScore = scores[zeroScoreIndex];

      ScoreService.remove(zeroScore.uuid);

      expect(ScoreService.getStatistics()).toEqual({
        minimum: 50,
        maximum: 100,
        average: 75
      });
    });

  });

});
