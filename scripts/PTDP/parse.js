
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const templates = require('./templates');
const { has } = require('./helpers');
const modifyEntry = require('./modifyEntry');
const { DIST_LOCATION, TEMP_OBJECT, SPACES } = require('./constants');

function parse(obj, key, value) {
  return new Promise((resolve, reject) => {
    const newFile = `${DIST_LOCATION}/${key}.json`;
    let newEntry = {};
    let hasPostScripts = false;

    if (has(templates, key)) {
      newEntry = modifyEntry(obj, templates[key]);

      // Just me being lazy :-)
      if (typeof templates[key].any !== 'undefined' && typeof templates[key].any.POST !== 'undefined') hasPostScripts = true;
    }

    if (!Object.keys(newEntry).length) {
      newEntry = obj;
    }

    if (hasPostScripts) {
      TEMP_OBJECT[key] = newEntry;

      resolve();
    } else {
      jsonfile.writeFile(newFile, newEntry, { spaces: SPACES }).then(() => {
        console.log(`${chalk.cyanBright('FILTER')} ${chalk.green(value)} => ${chalk.green(key)} completed`);

        resolve();
      }).catch(() => {
        reject(error);
      });
    }
  });
}

module.exports = parse;
