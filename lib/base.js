/**
 * Checks if object is an array
 * @param  {Object}  obj
 * @return {Boolean}
 */
function isArray(obj) {
	return (!!obj) && (obj.constructor === Array);
}

/**
 * Checks if object is a standard object
 * @param  {Object}  obj - The object in question
 * @return {Boolean}
 */
function isObject(obj) {
	return (!!obj) && (obj.constructor === Object);
}

/**
 * Checks if object is a string
 * @param  {Object}  obj - The object in question
 * @return {Boolean}
 */
function isString(obj) {
	return (typeof obj === 'string');
}

/**
 * Checks if object is a number
 * @param  {Object}  obj - The object in question
 * @return {Boolean}
 */
function isNumber(obj) {
	return (typeof obj === 'number');
}

/**
 * Converts object into an array
 * @param  {Object} obj - The object to convert
 * @return {Array}
 */
function toArray(obj) {
	if (isArray(obj)) {
		return obj;
	}
	return [obj];
}

/**
 * Takes an array-like object and performs a slice
 * at the specified index
 * @param  {Array} arr
 * @param  {Number} idx
 * @return {Array}
 */
function slice(arr, idx) {
	return Array.prototype.slice.call(arr, idx || 0);
}

function extend(target) {
	var source, i, k;

	i = arguments.length;

	while (i-- > 1) {
		source = arguments[i];

		for (k in source) {
			target[k] = source[k];
		}
	}

	return target;
}