
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const templates = require('./templates');
const { DIST_LOCATION, SPACES, TEMP_OBJECT } = require('./constants');

function postFilter(obj, key, value) {
  return new Promise(async (resolve, reject) => {
    const newFile = `${DIST_LOCATION}/${key}.json`;

    for (post of templates[key].any.POST) {
      await post(obj, key, value);
    }

    jsonfile.writeFile(newFile, TEMP_OBJECT[key], { spaces: SPACES }).then(() => {
      console.log(`${chalk.cyanBright('POST')} ${chalk.green(value)} => ${chalk.green(key)} completed`);

      resolve();
    }).catch(() => {
      reject(error);
    });
  });
}

module.exports = postFilter;
