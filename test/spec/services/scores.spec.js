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
      var userProvidedScore = {
        name: "Greg",
        value: 100,
        uuid: "00000000-0000-0000-0000-000000000000"
      };
      var result = ScoreService.create(userProvidedScore);

      expect(result.name).toEqual(userProvidedScore.name);
      expect(result.value).toEqual(userProvidedScore.value);
    });

    it("persists score to local storage", function() {
      var userProvidedScore = {
        name: "Greg",
        value: 100,
        uuid: "00000000-0000-0000-0000-000000000000"
      };

      spyOn(localStorageService, "set");
      var result = ScoreService.create(userProvidedScore);

      expect(localStorageService.set).toHaveBeenCalled();
      expect(result).toEqual(userProvidedScore);
    });

    it("returns undefined when user input is not valid", function() {
      var userProvidedScore = { name: false, value: false };
      var result = ScoreService.create(userProvidedScore);

      expect(result).toBeUndefined();
    });
  });

  it("gets list of scores", function() {
    spyOn(localStorageService, "get");
    ScoreService.getList();

    expect(localStorageService.get).toHaveBeenCalled();
  });

  it("removes a score based on key", function() {
    spyOn(localStorageService, "set");
    ScoreService.remove("00000000-0000-0000-0000-000000000000");

    expect(localStorageService.set).toHaveBeenCalled();
  });

});
