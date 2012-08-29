var B = require("buster-core");
var when = require("when");
var argument = require("./argument");

function detectDuplicates(options) {
    options.forEach(function (option, i) {
        if (options.slice(i + 1).some(function (o) { return option === o; })) {
            throw new Error("Duplicate option (" + option + ")");
        }
    });
}

function unexpectedValueError(option) {
    return new Error(option.signature + " does not take a value.");
}

function missingValueError(option) {
    return new Error("No value specified for " + option.signature);
}

function validateOption(option) {
    if (module.exports.isShortOption(option) && option.length > 2) {
        throw new Error("A short option can only be one dash and " +
                        "one character (" + option + ").");
    }
    return option;
}

function getTransform(properties) {
    if (!properties.transform) { return; }
    if (typeof properties.transform !== "function") {
        throw new Error("transform must be function");
    }
    return properties.transform;
}

function getRequiresValue(properties) {
    if (!properties.hasOwnProperty("requiresValue")) { return true; }
    return properties.requiresValue;
}

module.exports = {
    create: function (opts, props) {
        if (opts.length === 0) {
            throw new Error("Option must have at least one name, e.g. --help");
        }
        detectDuplicates(opts);
        props = props || {};
        var options = opts.map(validateOption);
        return B.extend(B.create(this), argument.create(props.validators), {
            options: options,
            signature: options.join("/"),
            hasValue: !!props.hasValue || props.hasOwnProperty("defaultValue"),
            requiresValue: getRequiresValue(props),
            transform: getTransform(props),
            defaultValue: props.defaultValue,
            description: props.description
        });
    },

    valueRequired: function () {
        return this.hasValue && this.requiresValue;
    },

    handle: function (data, value) {
        if (value && !this.hasValue) { throw unexpectedValueError(this); }
        if (!value && this.valueRequired()) { throw missingValueError(this); }
        if (value) { data.value = value; }
        data.isSet = true;
        data.timesSet++;
    },

    intersects: function (o) {
        return this.options.some(function (opt) { return o.recognizes(opt); });
    },

    recognizes: function (option, data) {
        var shortOpt = option.slice(0, 2);
        var longOpt = option.split("=")[0];
        return this.options.indexOf(shortOpt) >= 0 ||
            this.options.indexOf(longOpt) >= 0;
    },

    keys: function () {
        return this.options;
    },

    isLongOption: function (option) {
        return (/^\-\-./).test(option);
    },

    isShortOption: function (option) {
        return (/^\-[^\-]/).test(option);
    },

    isOption: function (opt) {
        return this.isLongOption(opt) || this.isShortOption(opt);
    }
};
