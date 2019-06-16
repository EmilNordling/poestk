const jsonfile = require('jsonfile');
const chalk = require('chalk');
const { DIST_LOCATION, TEMP_OBJECT, SPACES } = require('../constants');

function toHex(input) {
	let hash = '';
	let availableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let availableCharactersLength = availableCharacters.length;

	do {
		hash = availableCharacters[input % availableCharactersLength] + hash;
		input = parseInt(input / availableCharactersLength, 10);
	} while (input);

	return hash;
}

const NUMBER_REGEX = /[0-9]+(\.[0-9]+)?/g;

let keyIteration = 0;

function addToScheme(stats) {
	const scheme = TEMP_OBJECT.__SCHEME__;

	const newStats = stats.map(stat => {
		const keyValues = Object.entries(scheme);
		let values = stat.match(NUMBER_REGEX);
		const newString = stat.replace(NUMBER_REGEX, '#');

		if (!values) {
			values = false;
		} else if (values.length === 1) {
			values = values[0];
		}

		let match = keyValues.find(([_, existingValue]) => existingValue === newString);

		if (!match) {
			const hex = toHex(keyIteration++);

			scheme[hex] = newString;

			match = [hex];
		}

		const [key] = match;
		const obj = {};
		obj[key] = values;

		return obj;
	});

	return newStats;
}

function createScheme(nodes) {
	TEMP_OBJECT.__SCHEME__ = {};
	const newFile = `${DIST_LOCATION}/scheme.json`;

	return new Promise((resolve, reject) => {
		// node.l = "sd"
		Object.values(nodes).forEach(node => {
			if (node.l) {
				node.l = addToScheme(node.l);
			}
		});

		jsonfile
			.writeFile(newFile, TEMP_OBJECT.__SCHEME__, { spaces: SPACES })
			.then(() => {
				console.log(`${chalk.cyanBright('GENERATING')} scheme => ${chalk.green('scheme')} completed`);

				resolve(nodes);
			})
			.catch(error => {
				reject(error);
			});
	});
}

module.exports = createScheme;
