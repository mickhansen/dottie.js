var expect = require("expect.js"),
	dottie = require('../dottie');

/* If people modify the array prototype Dottie should not be affected */
Array.prototype.getByName = function(name) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (typeof this[i] != "object") continue;
        if (this[i].name === name) return this[i];

    }
};
Array.prototype.getByType = function(type) {
    var newvalues = [];
    for (var i = 0, len = this.length; i < len; i++) {
        if (typeof this[i] != "object") continue;
        if (this[i].type === type) newvalues.push(this[i]);
    }
    if (newvalues.length <= 0) newvalues = undefined;
    return newvalues;
};

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