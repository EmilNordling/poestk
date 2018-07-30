const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const CleanWebpackPLugin = require('clean-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const paths = require('./paths');
const base = require('./webpack.config.base');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  ...base,
  devtool: 'sourcemap',
  entry: {
    app: [paths.appIndex],
  },
  output: {
    pathinfo: true,
    filename: 'scripts/[name]-[hash].js',
    chunkFilename: 'scripts/[name]-[hash].chunk.js',
    path: paths.appBuild,
    publicPath: paths.publicPath,
  },
  plugins: [
    new CleanWebpackPLugin([paths.appBuild], { root: `${process.cwd()}/..` }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new CopyWebpackPlugin([
      {
        from: paths.appPublic,
        to: '.',
        ignore: ['index.html'],
      },
    ]),
    new InterpolateHtmlPlugin({ PUBLIC_URL: '' }),
    new OfflinePlugin({
      appShell: '/',
      version: '[hash]',
      AppCache: false,
      updateStrategy: 'changed',
      autoUpdate: 1000 * 60 * 2,
      ServiceWorker: {
        minify: true,
        events: true,
        navigateFallbackURL: '/',
      },
    }),
    new UglifyJsPlugin({ uglifyOptions: {
      compress: true,
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      output: {
        comments: false
      }
    }}),
    new HtmlWebpackPLugin({
      template: paths.appHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
};
