const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('../dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndex: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  pstSrc: resolveApp('../pst_typescript'),
  appNodeModules: resolveApp('node_modules'),
};
