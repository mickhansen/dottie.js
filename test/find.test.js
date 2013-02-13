var buster = require('buster'),
	Dot = require('../dot');

buster.spec.expose();

describe("Dot.find", function () {
	var data = {
		'foo': {
			'bar': 'baz'
		},
		'zoo': 'lander'
	};

	it("should get first-level values", function () {
		expect(Dot.find('zoo', data)).toEqual('lander');
	});

	it("should get nested-level values", function () {
		expect(Dot.find('foo.bar', data)).toEqual('baz');
	});
});