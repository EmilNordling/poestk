const { resolve } = require('path');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push(
    {
      test: /\.(js|jsx|ts|tsx)$/,
      include: [resolveApp('src'), resolveApp('stories')],
      exclude: /node_modules/,
      use: [
        {
          loader: resolve(__dirname, '../', 'node_modules', 'babel-loader'),
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/env', {
                modules: false,
                targets: {
                  chrome: 60
                }
              }],
              '@babel/react',
              ['@babel/preset-stage-2', { loose: true, decoratorsLegacy: true }],
              '@babel/typescript',
            ],
            plugins: [
              'preval',
              'transform-modern-regexp',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              'react-hot-loader/babel',
              ['module-resolver', {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                root: ['../stories']
              }],
              '@babel/plugin-syntax-dynamic-import',
              ['@babel/plugin-proposal-class-properties', { loose: true, decoratorsLegacy: true }],
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-classes',
              'styled-components',
              'polished'
            ],
          },
        },
      ],
    }
  );

  storybookBaseConfig.resolve = {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  };

  return storybookBaseConfig;
};
