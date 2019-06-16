const jsonfile = require('jsonfile');
const chalk = require('chalk');
const parse = require('./parse');
const postParse = require('./postParse');
const { TREEDATA_LOCATION, TEMP_OBJECT } = require('./constants');

function readFile(value) {
  return new Promise((resolve, reject) => {
    console.log(`~ reading from: ${chalk.yellow(value)}`);

    const json = `${TREEDATA_LOCATION}/${value}.json`;

    jsonfile.readFile(json, async (err, obj) => {
      if (err) {
        reject(err);
      } else {
        // filter
        try {
          const parsePromises = Object.keys(obj).map(key => parse(obj[key], key, value));
          await Promise.all(parsePromises);

          const postPromises = Object.keys(TEMP_OBJECT).map(key => postParse(TEMP_OBJECT[key], key, value));
          await Promise.all(postPromises);

          resolve();
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
}

module.exports = readFile;
