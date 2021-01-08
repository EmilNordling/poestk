/* eslint-disable */
// @ts-check
const { Run } = require('one-atom/run');

process.env.PORT = '8001';

Run.development({
  hmr: true,
  root: process.cwd(),
  customConfig: `${process.cwd()}/env.json`,
  configFile: 'tsconfig.dev.json',
});
