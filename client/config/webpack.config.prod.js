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
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].chunk.js',
    path: paths.appBuild,
  },
  plugins: [
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
    new CleanWebpackPLugin([paths.appBuild], { root: process.cwd() }),
    new CopyWebpackPlugin([
      {
        from: paths.appPublic,
        to: '.',
        ignore: ['index.html'],
      },
    ]),
    new InterpolateHtmlPlugin({ PUBLIC_URL: '' }),
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
    new UglifyJsPlugin({ uglifyOptions: { output: { comments: false }} }),
    new OfflinePlugin({
      appShell: '/',
      version: '[hash]',
      AppCache: false,
      ServiceWorker: {
        minify: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
};
