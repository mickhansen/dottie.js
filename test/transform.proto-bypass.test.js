// test/transform.proto-bypass.test.js
// Tests for prototype pollution bypass fix in transform() (CVE-2023-26132 bypass)

var assert = require('assert');
var dottie = require('../dottie');

describe('dottie.transform - prototype pollution bypass prevention', function () {

  // === __proto__ at non-first positions ===

  it('should block __proto__ at second position in keys', function () {
    var flat = { 'user.__proto__.isAdmin': true, 'user.name': 'guest' };
    var result = dottie.transform(flat);

    // The isAdmin property should NOT be reachable via prototype chain
    assert.strictEqual(
      result.user === undefined || result.user.isAdmin === undefined, true,
      '__proto__ bypass in transform keys should be blocked'
    );

    // Global Object.prototype must remain clean
    assert.strictEqual(({}).isAdmin, undefined,
      'Object.prototype must not be polluted');
  });

  it('should block __proto__ at third position in keys', function () {
    var flat = { 'a.b.__proto__.polluted': true };
    var result = dottie.transform(flat);
    assert.strictEqual(({}).polluted, undefined,
      'Object.prototype must not be polluted');
  });

  it('should still block __proto__ at first position (original fix)', function () {
    var flat = { '__proto__.polluted': true };
    var result = dottie.transform(flat);
    assert.strictEqual(({}).polluted, undefined,
      'Object.prototype must not be polluted');
  });

  // === constructor and prototype keys ===

  it('should block constructor-based pollution in transform keys', function () {
    var flat = { 'a.constructor.prototype.polluted': true };
    var result = dottie.transform(flat);
    assert.strictEqual(({}).polluted, undefined,
      'constructor-based pollution must be blocked');
  });

  it('should block prototype key in transform keys', function () {
    var flat = { 'a.prototype.polluted': true };
    var result = dottie.transform(flat);
    assert.strictEqual(({}).polluted, undefined,
      'prototype-based pollution must be blocked');
  });

  // === Legitimate transforms should still work ===

  it('should transform normal dotted keys correctly', function () {
    var flat = {
      'user.name': 'Alice',
      'user.email': 'alice@example.com',
      'user.settings.theme': 'dark'
    };
    var result = dottie.transform(flat);
    assert.strictEqual(result.user.name, 'Alice');
    assert.strictEqual(result.user.email, 'alice@example.com');
    assert.strictEqual(result.user.settings.theme, 'dark');
  });
});
