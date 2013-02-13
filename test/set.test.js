var buster = require('buster')
	Dot = require('../dot');

buster.spec.expose();

describe("Dot.set", function () {
	var data = {
		'foo': {
			'bar': 'baa'
		}
	};

	it("should set nested values on existing structure", function () {
		Dot.set(data, 'foo.bar', 'baz');
		expect(data.foo.bar).toEqual('baz');
	});

	it("should create nested structure if not existing", function () {
		Dot.set(data, 'level1.level2', 'foo');
		expect(data.level1.level2).toEqual('foo');
		expect(typeof data.level1).toEqual('object');
	});
});