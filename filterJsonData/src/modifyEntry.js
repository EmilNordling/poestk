const validate = require('./validate');
const { each } = require('./helpers');

function modifyEntry(objKey, template) {
	const objectKey = objKey;
	let newEntry;

	if (Array.isArray(objectKey)) {
		newEntry = [];

		each(objectKey, nodeKey => {
			const newObj = validate(objectKey[nodeKey], template);
			newEntry.push(newObj);
		});
	} else {
		newEntry = validate(objectKey, template);
	}

	return newEntry;
}

module.exports = modifyEntry;
