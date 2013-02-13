var buster = require('buster'),
	Dot = require('../dot');

buster.spec.expose();

describe("Dot.get", function () {
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
		expect(Dot.get(data, 'zoo')).toEqual('lander');
	});

	it("should get nested-level values", function () {
		expect(Dot.get(data, 'foo.bar')).toEqual('baz');
	});

	it("should return undefined if not found", function () {
		expect(Dot.get(data, 'foo.zoo.lander')).toEqual(undefined);
	});

	it("should return false values properly", function () {
		expect(Dot.get(data, 'false.value')).toEqual(false);
	});
});