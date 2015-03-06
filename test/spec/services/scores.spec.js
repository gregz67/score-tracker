"use strict";

describe("ScoreService", function() {
  var ScoreService, localStorageService;

  beforeEach(module("scoreTrackerApp"));
  beforeEach(inject(function (_ScoreService_, _localStorageService_) {
    ScoreService = _ScoreService_;
    localStorageService = _localStorageService_;

  }));

  describe("create", function() {

    it("returns a score with name and value set", function() {
      var userProvidedScore = { name: "Greg", value: 100 };
      var result = ScoreService.create(userProvidedScore);

      expect(result.name).toEqual(userProvidedScore.name);
      expect(result.value).toEqual(userProvidedScore.value);
    });

    it("persists score to local storage", function() {
      var userProvidedScore = { name: "Greg", value: 100 };

      spyOn(localStorageService, "set");
      ScoreService.create(userProvidedScore);

      expect(localStorageService.set).toHaveBeenCalled();
    });

    it("returns null when user input is not valid", function() {
      var userProvidedScore = { name: false, value: false };
      var result = ScoreService.create(userProvidedScore);

      expect(result).toBeUndefined();
    });
  });

  describe("getList", function () {
    it("gets list of scores", function() {
    });
  });

});
