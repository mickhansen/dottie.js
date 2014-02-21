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

describe("dottie.transform", function () {
	it("should create a properly nested object from a basic dottie notated set of keys", function () {
		var values = {
			'user.name': 'John Doe',
			'user.email': 'jd@foobar.com',
			'user.location.country': 'Zanzibar',
			'user.location.city': 'Zanzibar City'
		};

		var transformed = dottie.transform(values);

		expect(transformed.user).not.to.be(undefined);
		expect(transformed.user.location).not.to.be(undefined);

		expect(transformed.user).to.be.an('object');
		expect(transformed.user.location).to.be.an('object');

		expect(transformed.user.email).to.equal('jd@foobar.com');
		expect(transformed.user.location.city).to.equal('Zanzibar City');
	});

	it("should be able to handle a mixture of nested properties and dottie notated set of keys", function () {
		var values = {
			user: {
				name: 'John Doe'
			},
			'user.email': 'jd@foobar.com',
			'user.location.country': 'Zanzibar',
			'user.location.city': 'Zanzibar City',
			'project.title': 'dottie'
		};

		var transformed = dottie.transform(values);

		expect(transformed.user).not.to.be(undefined);
		expect(transformed.user.location).not.to.be(undefined);
		expect(transformed.project).not.to.be(undefined);

		expect(transformed.user).to.be.an('object');
		expect(transformed.user.location).to.be.an('object');
		expect(transformed.project).to.be.an('object');

		expect(transformed.user.email).to.equal('jd@foobar.com');
		expect(transformed.user.location.city).to.equal('Zanzibar City');
		expect(transformed.project.title).to.equal('dottie');
	});

	it("should be able to handle base level properties together with nested", function () {
		var values = {
			'customer.name': 'John Doe',
			'customer.age': 15,
			'client': 'Lolcat'
		};

		var transformed = dottie.transform(values);

		expect(transformed.client).not.to.be(undefined);
		expect(transformed.hasOwnProperty('client')).to.be.ok(); // Ensure that the property is actually on the object itself, not on the prototype.
		expect(transformed.customer).not.to.be(undefined);

		expect(transformed.customer).to.be.an('object');

		expect(transformed.client).to.equal('Lolcat');
		expect(transformed.customer.name).to.equal('John Doe');
		expect(transformed.customer.age).to.equal(15);
	});
});