var buster = require('buster'),
	Dot = require('../dot');

buster.spec.expose();

describe("Dot.transform", function () {
	it("should create a properly nested object from a basic dot notated set of keys", function () {
		var values = {
			'user.name': 'John Doe',
			'user.email': 'jd@foobar.com',
			'user.location.country': 'Zanzibar',
			'user.location.city': 'Zanzibar City'
		};

		var transformed = Dot.transform(values);

		expect(transformed.user).toBeDefined();
		expect(transformed.user.location).toBeDefined();

		expect(typeof transformed.user).toEqual('object');
		expect(typeof transformed.user.location).toEqual('object');

		expect(transformed.user.email).toEqual('jd@foobar.com');
		expect(transformed.user.location.city).toEqual('Zanzibar City');
	});

	it("should be able to handle a mixture of nested properties and dot notated set of keys", function () {
		var values = {
			user: {
				name: 'John Doe'
			},
			'user.email': 'jd@foobar.com',
			'user.location.country': 'Zanzibar',
			'user.location.city': 'Zanzibar City',
			'project.title': 'Dot'
		};

		var transformed = Dot.transform(values);

		expect(transformed.user).toBeDefined();
		expect(transformed.user.location).toBeDefined();
		expect(transformed.project).toBeDefined();

		expect(typeof transformed.user).toEqual('object');
		expect(typeof transformed.user.location).toEqual('object');
		expect(typeof transformed.project).toEqual('object');

		expect(transformed.user.email).toEqual('jd@foobar.com');
		expect(transformed.user.location.city).toEqual('Zanzibar City');
		expect(transformed.project.title).toEqual('Dot');
	});
});