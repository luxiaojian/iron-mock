const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssImport = require('postcss-import');
const webpack = require('webpack');
const cssnext = require('cssnext');
const postcssNested = require('postcss-nested');
const postcssOpacity = require('postcss-opacity');

var outputFilename = '[name].js';

const rootPaths = [
  path.join(__dirname, './bower_components'),
  path.join(__dirname, './app/css'),
];

var plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './app/index.html'
  })
];

if (process.env.COMPRESS) {
  plugins.push(
    new ExtractTextPlugin('[name].[contenthash:6].css'),
    new webpack.optimize.UglifyJsPlugin({
      banner: '',
      footer: '',
      mangle: {},
      beautify: false,
      report: 'min',
      expression: false,
      compressor: {
        warnings: false
      }
    })
  );
  outputFilename = '[name].[chunkhash:6].js';
} else {
  plugins.push(
    new ExtractTextPlugin('[name].css')
  );
}

module.exports = {
  entry: {
    vendor: './app/vendor',
    main: './app/app.js'
  },
  output: {
    path: './public',
    publicPath: './',
    filename: outputFilename
  },
  resolve: {
    root: rootPaths
  },
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'jshint-loader' }
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel!ng-annotate?add=true' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      { test: /\.html$/, loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname) + '!html' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff&name=[path][name].[hash:6].[ext]" },
      { test: /\.jpe?g$|\.gif$|\.png$/, loader: "url-loader?limit=10000&name=[path][name].[hash:6].[ext]" },
      { test: /\.(ttf|svg|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[path][name].[hash:6].[ext]" }
    ]
  },
  postcss: function() {
    return [
      cssImport({
        path: [path.join(__dirname, './app/css')],
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      postcssNested,
      postcssOpacity,
      cssnext({ browsers: ['ie >= 8', 'chrome >= 26', 'Firefox ESR'] })
    ];
  },
  plugins: plugins
};