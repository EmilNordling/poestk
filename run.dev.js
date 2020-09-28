//@ts-check
'use strict';
const inquirer = require('inquirer');
const { package_choices, run } = require('./run');

process.env.PORT = '8001';

// For user
inquirer
  .prompt([
    {
      type: 'list',
      loop: false,
      name: 'pkg',
      message: 'Chose which package to run',
      choices: package_choices,
    },
  ])
  .then((answers) => {
    run(answers.pkg, 'dev');
  });
