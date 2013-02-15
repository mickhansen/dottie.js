var buster = require('buster'),
	dottie = require('../dottie');

buster.spec.expose();

describe("dottie.get", function () {
	var data = {
		'foo': {
			'bar': 'baz'
		},
		'zoo': 'lander',
		'false': {
			'value': false
		}
	};

	it("should get first-level values", function () {
		expect(dottie.get(data, 'zoo')).toEqual('lander');
	});

	it("should get nested-level values", function () {
		expect(dottie.get(data, 'foo.bar')).toEqual('baz');
	});

	it("should return undefined if not found", function () {
		expect(dottie.get(data, 'foo.zoo.lander')).toEqual(undefined);
	});

	it("should return false values properly", function () {
		expect(dottie.get(data, 'false.value')).toEqual(false);
	});
});