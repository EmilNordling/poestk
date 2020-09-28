//@ts-check
'use strict';
const { argv } = require('yargs');
const { run } = require('./run');

// For automation
const { pkg } = argv;
if (pkg === undefined) {
  console.log('"pkg" needs to be specified');
  process.exit(1);
}

run(pkg, 'prod').then(() => {
  console.log('success');
  process.exit(0);
});
