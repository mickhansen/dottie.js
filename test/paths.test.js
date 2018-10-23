var expect = require('chai').expect
  , dottie = require("../dottie");

describe("dottie.paths", function() {
  it("throws for non-objects", function() {
    expect(function() {
      dottie.paths("no object")
    }).to.throw();
  });

  it("returns the keys of a flat object", function() {
    expect(dottie.paths({ a: 1, b: 2 })).to.eql(["a", "b"]);
  });

  it("returns the paths of a deeply nested object", function() {
    var object = {
      a: 1,
      b: {
        c: 2,
        d: { e: 3 }
      }
    };

    expect(dottie.paths(object)).to.eql(["a", "b.c", "b.d.e"]);
  });
});
