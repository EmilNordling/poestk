/* eslint-disable */
// @ts-check
const { Run } = require('one-atom/run');

Run.production({
  useBundleAnalyzer: true,
  root: process.cwd(),
  customEnv: 'dev_env',
  loadConfigPathToFile: `${process.cwd()}/env.json`,
})
  .then(() => {
    console.log('bundled worked');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
