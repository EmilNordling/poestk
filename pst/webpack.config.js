const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

let plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: ['Ready on http://localhost:3001'],
    },
  }),
];

if (isDev) {
  plugins = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 5003,
      proxy: 'http://localhost:5002/',
      notify: false,
    }, {
      reload: false,
    }),
  ];
} else {
  plugins = [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: false,
      mangle: {
        except: ['Pst', '$'],
      },
      beautify: false,
    }),
  ];
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  entry: {
    pst: './Pst.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 5002,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    quiet: true,
    compress: true,
  },
  plugins,
};
