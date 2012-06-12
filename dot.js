(function(undefined) {
	var root = this;
	
	// Object cloning function, uses jQuery/Underscore/Object.clone depending on what's available
	
	var clone = function (object) {
		if (typeof Object.create !== 'undefined') {
			return Object.create(object);
		}
		if (typeof jQuery !== 'undefined') {
			return jQuery.extend({}, object);
		}
		if (typeof _ !== 'undefined') {
			return _.extend({}, object);
		}
		
	};

	var Dot = function() {
		var args = Array.prototype.slice.call(arguments);
		
		if (args.length == 2) {
			return Dot.find.apply(this, args);
		}
		return Dot.transform.apply(this, args);
	};
	
	// Traverse object according to path, return value if found - Return undefined if destination is unreachable
	Dot.find = function(path, object) {
		var pieces = path.split('.'), current = object, piece;
		
		for (var index in pieces) {
			piece = pieces[index];
			if (!current.hasOwnProperty(piece)) {
				return undefined;
			}
			current = current[piece];
		};
		return current;
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
