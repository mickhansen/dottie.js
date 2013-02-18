var buster = require('buster'),
	dottie = require('../dottie');

buster.spec.expose();

describe("dottie.transform", function () {
	it("should create a properly nested object from a basic dottie notated set of keys", function () {
		var values = {
			'user.name': 'John Doe',
			'user.email': 'jd@foobar.com',
			'user.location.country': 'Zanzibar',
			'user.location.city': 'Zanzibar City'
		};

		var transformed = dottie.transform(values);

		expect(transformed.user).toBeDefined();
		expect(transformed.user.location).toBeDefined();

		expect(transformed.user).toBeObject();
		expect(transformed.user.location).toBeObject();

		expect(transformed.user.email).toEqual('jd@foobar.com');
		expect(transformed.user.location.city).toEqual('Zanzibar City');
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

		expect(transformed.user).toBeDefined();
		expect(transformed.user.location).toBeDefined();
		expect(transformed.project).toBeDefined();

		expect(transformed.user).toBeObject();
		expect(transformed.user.location).toBeObject();
		expect(transformed.project).toBeObject();

		expect(transformed.user.email).toEqual('jd@foobar.com');
		expect(transformed.user.location.city).toEqual('Zanzibar City');
		expect(transformed.project.title).toEqual('dottie');
	});

	it("should be able to handle base level properties together with nested", function () {
		var values = {
			'customer.name': 'John Doe',
			'customer.age': 15,
			'client': 'Lolcat'
		};

		var transformed = dottie.transform(values);

		expect(transformed.client).toBeDefined();
		expect(transformed.hasOwnProperty('client')).toBeTruthy(); // Ensure that the property is actually on the object itself, not on the prototype.
		expect(transformed.customer).toBeDefined();

		expect(transformed.customer).toBeObject();

		expect(transformed.client).toEqual('Lolcat');
		expect(transformed.customer.name).toEqual('John Doe');
		expect(transformed.customer.age).toEqual(15);
	});
});