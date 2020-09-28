//@ts-check
'use strict';
const { Run } = require('@kira/bundler');

const package_choices = [
  {
    name: 'app-desktop',
    value: 'app-desktop',
  },
  {
    name: 'skill-tree',
    value: 'skill-tree',
  },
];

const operation_choices = [
  {
    name: 'Start development server',
    value: 'dev',
    short: 'dev',
  },
  {
    name: 'Build for production',
    value: 'prod',
    short: 'prod',
  },
];

const pkd_actions = new Set(package_choices.map((x) => x.value));
const env_actions = new Set(operation_choices.map((x) => x.value));

async function run(pkg, env) {
  const actions = [pkd_actions.has(pkg), env_actions.has(env)];
  if (!actions[0] || !actions[1]) {
    console.log(`command doesn't match any records`);
    process.exit(1);
  }

  const run_path = `${process.cwd()}/packages/${pkg}`;

  if (env === 'dev') {
    Run.development({
      hmr: true,
      parseWithBabel: true,
      root: run_path,
      customEnv: 'dev_env',
      loadConfigPathToFile: `${run_path}/env.json`,
    });

    return;
  }

  try {
    await Run.production({
      root: run_path,
      customEnv: 'dev_env',
      loadConfigPathToFile: `${run_path}/env.json`,
      parseWithBabel: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  package_choices,
  operation_choices,
  run,
};
