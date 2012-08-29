var B = require("buster-core");
var argument = require("./argument");
var option = require("./option");
var fs = require("fs");

module.exports = {
    create: function (name, props) {
        if (typeof name === "object") {
            props = name;
            name = null;
        }
        props = props || {};
        return B.extend(B.create(this), argument.create(props.validators), {
            signature: name || "OPD",
            greedyValues: [],
            greedy: !!props.greedy,
            defaultValue: props.greedy ? [] : undefined,
            description: props.description
        });
    },

    isSatiesfied: function (data) {
        return data.isSet && !this.greedy;
    },

    recognizes: function (arg, data) {
        return !option.isOption(arg) && !this.isSatiesfied(data);
    },

    handle: function (data, value) {
        data.isSet = true;
        data.timesSet++;
        if (this.greedy) {
            data.value.push(value);
        } else {
            data.value = value;
        }
    },

    isOperand: function (option) {
        return module.exports.isPrototypeOf(option);
    },

    keys: function () {
        return [this.signature];
    }
};
