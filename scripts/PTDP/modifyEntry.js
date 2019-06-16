const validateProperty = require('./validateProperty');
const { each } = require('./helpers');

function modifyEntry(obj, template) {
  let newEntry;

  if (Array.isArray(obj)) {
    newEntry = [];

    each(obj, (nodeKey) => {
      newEntry.push(validateProperty(obj[nodeKey], template));
    });
  } else {
    newEntry = validateProperty(obj, template);
  }

  return newEntry;
}

module.exports = modifyEntry;
