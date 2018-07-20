const paths = require('./paths');

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: require('os').cpus().length - 1,
  },
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  },
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [paths.appSrc],
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          threadLoader,
          babelLoader,
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  performance: {
    hints: false,
  },
};
