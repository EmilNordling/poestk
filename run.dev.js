/* eslint-disable */
// @ts-check
const { Run } = require('one-atom/run');

process.env.PORT = '8001';

Run.development({
  hmr: true,
  root: process.cwd(),
  customEnv: 'dev_env',
  loadConfigPathToFile: `${process.cwd()}/env.json`,
});
