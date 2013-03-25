var buster = require('buster'),
	dottie = require('../dottie');

buster.spec.expose();

describe("dottie.set", function () {
	var data = {
		'foo': {
			'bar': 'baa'
		}
	};

	it("should set nested values on existing structure", function () {
		dottie.set(data, 'foo.bar', 'baz');
		expect(data.foo.bar).toEqual('baz');
	});

	it("should create nested structure if not existing", function () {
		dottie.set(data, 'level1.level2', 'foo');
		expect(data.level1.level2).toEqual('foo');
		expect(typeof data.level1).toEqual('object');
	});

	it("should handle setting a nested value on an undefined value (should convert undefined to object)", function () {
		var data = {
			'values': undefined
		};

		dottie.set(data, 'values.level1', 'foo');
		expect(data.values.level1).toEqual('foo');
	});

	it("should throw error when setting a nested value on an existing key with a non-object value", function() {
		expect(function () {
			dottie.set(data, 'foo.bar.baz', 'someValue');
		}).toThrow();
	});
});