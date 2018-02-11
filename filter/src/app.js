const chalk = require('chalk');
const jsonfile = require('jsonfile');
const config = require('./config');
const modifyEntry = require('./modifyEntry');
const template = require('./templates');
const { has } = require('./helpers');
const AppError = require('./error');

jsonfile.spaces = config.spaces;

if (!Array.isArray(config.entries)) config.entries = [config.entries];

config.entries.forEach((value, i) => {
  const json = `${config.contex}/${config.entries[i]}.json`;

  jsonfile.readFile(json, (err, obj) => {
    if (err) {
      throw new AppError(err);
    } else {
      Object.keys(obj).forEach((key) => {
        const objKey = obj[key];
        const newFile = `${config.dist}/${key}.json`;
        let newEntry = {};

        if (has(template, key)) {
          newEntry = modifyEntry(objKey, template[key]);
        }

        if (!Object.keys(newEntry).length) {
          newEntry = objKey;
        }

        jsonfile.writeFile(newFile, newEntry, (writeErr) => {
          if (err) {
            throw new AppError(writeErr);
          } else {
            console.log(`${chalk.green(value)} => ${chalk.green(key)} completed`);
          }
        });
      });
    }
  });
});
