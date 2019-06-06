const chalk = require('chalk');
const jsonfile = require('jsonfile');
const config = require('./config');
const modifyEntry = require('./modifyEntry');
const template = require('./templates');
const { has } = require('./helpers');

jsonfile.spaces = config.spaces;

if (!Array.isArray(config.entries)) config.entries = [config.entries];

let tempObject = {};

function filter(obj, key, value) {
  return new Promise((resolve, reject) => {
    const newFile = `${config.dist}/${key}.json`;
    let newEntry = {};
    let dirty = false;

    if (has(template, key)) {
      newEntry = modifyEntry(obj, template[key]);

      if (template[key].POST) dirty = true;
    }

    if (!Object.keys(newEntry).length) {
      newEntry = obj;
    }

    if (dirty) {
      tempObject[key] = newEntry;

      resolve();
    } else {
      jsonfile.writeFile(newFile, newEntry, (writeErr) => {
        if (writeErr) {
          reject();
        } else {
          resolve();
          console.log(`${chalk.cyanBright('FILTER')} ${chalk.green(value)} => ${chalk.green(key)} completed`);
        }
      });
    }
  });
}

function postFilter(obj, key, value) {
  return new Promise(async (resolve, reject) => {
    const newFile = `${config.dist}/${key}.json`;

    const newEntry = await template[key].POST(obj, key, value);

    jsonfile.writeFile(newFile, newEntry, (writeErr) => {
      if (writeErr) {
        reject();
      } else {
        resolve();
        console.log(`${chalk.cyanBright('POST')} ${chalk.green(value)} => ${chalk.green(key)} completed`);
      }
    });
  });
}

function readBaseFile(value) {
  console.log(`${chalk.yellow(value)}`);

  return new Promise((resolve, reject) => {
    const json = `${config.context}/${value}.json`;

    jsonfile.readFile(json, async (err, obj) => {
      if (err) {
        reject(err);
      } else {
        // filter
        const filterPromises = Object.keys(obj).map(key => filter(obj[key], key, value));
        await Promise.all(filterPromises);

        // post
        const postPromises = Object.keys(tempObject).map(key => postFilter(tempObject[key], key, value));
        await Promise.all(postPromises);

        tempObject = {};
        resolve();
      }
    });
  });
}

(async function () {
  await readBaseFile('ascClasses');
  await readBaseFile('passiveSkillTreeData');
}());
