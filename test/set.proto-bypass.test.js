// test/set.proto-bypass.test.js
// Tests for prototype pollution bypass fix (CVE-2023-26132 bypass)

var assert = require('assert');
var dottie = require('../dottie');

describe('dottie.set - prototype pollution bypass prevention', function () {

  // === __proto__ at non-first positions ===

  it('should block __proto__ at second position', function () {
    var obj = {};
    dottie.set(obj, 'a.__proto__.polluted', true);

    // The property should NOT be reachable via prototype chain
    assert.strictEqual(obj.a === undefined || obj.a.polluted === undefined, true,
      '__proto__ at position 1 should be blocked');

    // Global Object.prototype must remain clean
    assert.strictEqual(({}).polluted, undefined,
      'Object.prototype must not be polluted');
  });

  it('should block __proto__ at third position', function () {
    var obj = {};
    dottie.set(obj, 'a.b.__proto__.polluted', true);
    assert.strictEqual(({}).polluted, undefined,
      'Object.prototype must not be polluted');
  });

  it('should still block __proto__ at first position (original CVE-2023-26132 fix)', function () {
    var obj = {};
    dottie.set(obj, '__proto__.polluted', true);
    assert.strictEqual(({}).polluted, undefined,
      'Object.prototype must not be polluted');
  });

  // === constructor and prototype keys ===

  it('should block constructor at any position', function () {
    var obj = {};
    dottie.set(obj, 'a.constructor.prototype.polluted', true);
    assert.strictEqual(({}).polluted, undefined,
      'constructor-based pollution must be blocked');
  });

  it('should block prototype at any position', function () {
    var obj = {};
    dottie.set(obj, 'a.prototype.polluted', true);
    assert.strictEqual(({}).polluted, undefined,
      'prototype-based pollution must be blocked');
  });

  // === Legitimate paths should still work ===

  it('should allow normal nested paths', function () {
    var obj = {};
    dottie.set(obj, 'a.b.c', 'hello');
    assert.strictEqual(obj.a.b.c, 'hello');
  });

  it('should allow paths with similar-looking but safe key names', function () {
    var obj = {};
    dottie.set(obj, 'user.proto.value', 42);
    assert.strictEqual(obj.user.proto.value, 42);
  });
});
