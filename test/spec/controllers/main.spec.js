"use strict";

describe("Controller: MainCtrl", function () {

  // load the controller"s module
  beforeEach(module("scoreTrackerApp"));

  var MainCtrl,
    scope,
    ScoreService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _ScoreService_) {
    scope = $rootScope.$new();
    ScoreService = _ScoreService_;

    spyOn(ScoreService, "getList").and.returnValues([
      {
        name: "Megan",
        value: 99,
        uuid: "00000000-0000-0000-0000-000000000001"
      },
      {
        name: "Josh",
        value: 99,
        uuid: "00000000-0000-0000-0000-000000000002"
      }
    ]);

    MainCtrl = $controller("MainCtrl", {
      $scope: scope,
      ScoreService: ScoreService
    });
  }));

  it("put a list of scores on scope", function () {
    expect(_.size(scope.scores)).toBe(2);
  });

  it("creates new score", function() {
    var userProvidedScore = {
        name: "Greg",
        value: 100,
        uuid: "00000000-0000-0000-0000-000000000000"
      };
    spyOn(ScoreService, "create").and.returnValue(userProvidedScore);

    scope.addScore(userProvidedScore);
    expect(ScoreService.create).toHaveBeenCalledWith(userProvidedScore);
  });

  it("removes score", function() {
    var userProvidedScore = {
      name: "Greg",
      value: 100,
      uuid: "00000000-0000-0000-0000-000000000000"
    };
    spyOn(ScoreService, "remove");

    scope.removeScore(userProvidedScore.uuid);

    expect(ScoreService.remove).toHaveBeenCalledWith(userProvidedScore.uuid);
  });

  it("updates score", function() {
    var userUpdatedScore = {
      name: "Greg",
      value: 99,
      uuid: "00000000-0000-0000-0000-000000000000"
    };
    spyOn(ScoreService, "update");

    scope.updateScore(userUpdatedScore);

    expect(ScoreService.update).toHaveBeenCalledWith(userUpdatedScore);
  });
});
