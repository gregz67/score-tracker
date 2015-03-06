"use strict";

describe("Uuid", function() {
  beforeEach(module("scoreTrackerApp"));

  var Uuid;

  beforeEach(inject(function (_Uuid_) {
    Uuid = _Uuid_;
  }));

  it("returns a valid uuid", function() {
    var uuid = Uuid.generate();
    var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(regex.test(uuid)).toBeTruthy();
  });

});

