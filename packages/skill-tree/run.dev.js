//@ts-check
'use strict';
const { Run } = require('@kira/bundler');

process.env.PORT = '8001';

Run.development({
  hmr: true,
  parseWithBabel: true,
  root: process.cwd(),
  customEnv: 'dev_env',
  loadConfigPathToFile: `${process.cwd()}/env.json`,
});
