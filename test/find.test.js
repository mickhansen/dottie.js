var buster = require('buster'),
	dottie = require('../dottie');

buster.spec.expose();

describe("dottie.find", function () {
	var data = {
		'foo': {
			'bar': 'baz'
		},
		'zoo': 'lander'
	};

	it("should get first-level values", function () {
		expect(dottie.find('zoo', data)).toEqual('lander');
	});

	it("should get nested-level values", function () {
		expect(dottie.find('foo.bar', data)).toEqual('baz');
	});
});