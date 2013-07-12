(function(undefined) {
	var root = this;

	// Object cloning function, uses jQuery/Underscore/Object.create depending on what's available

  var clone = function (object) {
    if (typeof Object.hasOwnProperty !== 'undefined') {
      var target = {};
      for (var i in object) {
        if (object.hasOwnProperty(i)) {
          target[i] = object[i];
        }
      }
      return target;
    }
    if (typeof jQuery !== 'undefined') {
      return jQuery.extend({}, object);
    }
    if (typeof _ !== 'undefined') {
      return _.extend({}, object);
    }
  };

	// Weird IE shit, objects do not have hasOwn, but the prototype does...
	var hasOwnProp = Object.prototype.hasOwnProperty;

	var Dot = function() {
		var args = Array.prototype.slice.call(arguments);

		if (args.length == 2) {
			return Dot.find.apply(this, args);
		}
		return Dot.transform.apply(this, args);
	};

	// Legacy syntax, changed syntax to have get/set be similar in arg order
	Dot.find = function(path, object) {
		return Dot.get(object, path);
	};

	// Traverse object according to path, return value if found - Return undefined if destination is unreachable
	Dot.get = function(object, path) {
		var pieces = path.split('.'), current = object, piece;

		if (current) {
			for (var index = 0, length = pieces.length; index < length; index++) {
				piece = pieces[index];
				if (!hasOwnProp.call(current, piece)) {
					return undefined;
				}
				current = current[piece];

				if (current === undefined) {
					return undefined;
				}
			}
			return current;
		}
		return undefined;
	};

	// Set nested value
	Dot.set = function(object, path, value) {
		var pieces = path.split('.'), current = object, piece, length = pieces.length;

		for (var index = 0; index < length; index++) {
			piece = pieces[index];
			if (!hasOwnProp.call(current, piece) || current[piece] === undefined) {
				current[piece] = {};
			}

			if (typeof current !== 'object') throw new Error('Target key is not suitable for a nested value (it is either not undefined or not an object)');

			if (index == (length - 1)) {
				current[piece] = value;
			} else {
				current = current[piece];
			}
		}

		current[piece] = value;
	};

	// Set default nested value
	Dot['default'] = function(object, path, value) {
		if (Dot.get(object, path) === undefined) {
			Dot.set(object, path, value);
		}
	};

	// Transform unnested object with .-seperated keys into a nested object.
	Dot.transform = function(object) {
		var pieces, piecesLength, current, transformed = clone(object), piece;
		for (var key in transformed) {
			if (key.indexOf('.') !== -1) {
				pieces = key.split('.');
				piecesLength = pieces.length;
				current = transformed;

				for (var index in pieces) {
					piece = pieces[index];
					if (index != (piecesLength - 1) && !current.hasOwnProperty(piece)) {
						current[piece] = {};
					}

					if (index == (piecesLength - 1)) {
						current[piece] = object[key];
						delete transformed[key];
					}
					current = current[piece];
				}
			} else {
				transformed[key] = transformed[key]; // Ensure that properties exist on the object, not just the prototype
			}
		}

		return transformed;
	};

	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = Dot;
	} else {
		root['Dot'] = Dot;

		if (typeof define === "function") {
			define([], function () { return Dot; });
		}
	}
})();
