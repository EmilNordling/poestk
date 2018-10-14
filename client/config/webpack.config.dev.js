const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const paths = require('./paths');
const base = require('./webpack.config.base');

const publicPath = '/';
const port = 5001;
const proxyPort = 5000

module.exports = {
  ...base,
  devtool: 'source-map',
  entry: {
    app: [
      require.resolve('react-hot-loader/patch'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.appIndex,
    ],
  },
  output: {
    pathinfo: true,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].chunk.js',
    publicPath,
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `
          Ready on http://localhost:${proxyPort}
          `,
        ],
      },
    }),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new HtmlWebpackPLugin({
      template: paths.appHtml,
      inject: true,
    }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: '' }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: proxyPort,
      proxy: `http://localhost:${port}/`,
      notify: false,
      open: false,
    }, {
      reload: false,
    }),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    quiet: true,
    publicPath,
    port,
    host: '0.0.0.0',
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    before(app) {
      app.use(errorOverlayMiddleware())
      app.use(noopServiceWorkerMiddleware())
    },
  },
};
