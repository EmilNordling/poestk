//const { scheme } = require('./scheme');

const characters = [];

const scheme = {};

function individualCheck(pure, impure, value) {
	const hashCount = (impure.match(/#/g) || []).length;
	if (hashCount !== value.length) return false;

	let testImpure = impure;
	value.forEach(value => {
		testImpure = testImpure.replace('#', value);
	});

	if (testImpure === pure) return true;

	return false;
}

function matchStrings(pure, impure) {
	return pure === impure;
}

function parseMods(text, format = 'array') {
	const parsedArray = [];
	const parsedObject = {};
	const values = text.match(/\d*\.?\d/gi);

	Object.keys(scheme).some(check => {
		const pure = text.toLowerCase();
		const impure = scheme[check].toLowerCase();

		if (values === null && matchStrings(pure, impure)) {
			parsedArray.push(check, 1);
			parsedObject[check] = 1;

			return true;
		}

		if (values !== null && individualCheck(pure, impure, values)) {
			parsedArray.push(check, values.length > 1 ? values.map(x => parseFloat(x)) : parseFloat(values[0]));
			parsedObject[check] = values.length > 1 ? values.map(x => parseFloat(x)) : parseFloat(values[0]);

			return true;
		}
	});

	if (format === 'object') {
		return Object.keys(parsedObject).length !== 0 ? parsedObject : null;
	}

	return parsedArray.length !== 0 ? parsedArray : null;
}

module.exports = {
	parseMods,
};
