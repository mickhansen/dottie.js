var expect = require("expect.js"),
	dottie = require('../dottie');

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
		expect(dottie.get(data, 'zoo')).to.equal('lander');
	});

	it("should get nested-level values", function () {
		expect(dottie.get(data, 'foo.bar')).to.equal('baz');
	});

	it("should return undefined if not found", function () {
		expect(dottie.get(data, 'foo.zoo.lander')).to.equal(undefined);
	});

	it("should return false values properly", function () {
		expect(dottie.get(data, 'false.value')).to.equal(false);
	});
});