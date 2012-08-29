var B = require("buster-core");
var when = require("when");

function validate(data, validator) {
    try {
        var val = validator(data);
        return when.isPromise(val) ? val : when(val);
    } catch (e) {
        return when.reject(e.message || e);
    }
}

module.exports = {
    create: function (validators) {
        return B.extend(B.create(this), { validators: validators || [] });
    },

    validate: function (data) {
        var validations = this.validators.map(B.bind(this, validate, data));
        return when.all(validations);
    }
};
