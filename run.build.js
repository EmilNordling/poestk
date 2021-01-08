/* eslint-disable */
// @ts-check
const { Run } = require('one-atom/run');

Run.production({
  useBundleAnalyzer: true,
  root: process.cwd(),
  customConfig: `${process.cwd()}/env.json`,
  configFile: 'tsconfig.prod.json',
})
  .then(() => {
    console.log('bundled worked');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
