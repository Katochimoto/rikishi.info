var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event; // start, build
var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

var options = {
  srcPath: srcPath,
  distPath: distPath
};
var defineConfig = require('./config/define')(TARGET);
var uglifyConfig = require('./config/uglify')(TARGET);
var htmlConfig = require('./config/html')(TARGET, options);

var extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: TARGET === 'start',
  allChunks: true
});

var common = {
  entry: {
    main: path.join(srcPath, 'main.js'),
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: path.join(distPath, 'assets'),
    publicPath: '/assets/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react'
            ]
          }
        }
      },

      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }],
            fallback: 'style-loader'
        })
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
		    loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([
      'dist/**/*.*'
    ], {
      verbose: true
    }),

    new webpack.DefinePlugin(defineConfig),

    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),

    extractSass,

    new HtmlWebpackPlugin(htmlConfig),
    new HtmlWebpackHarddiskPlugin()
  ]
};

if (TARGET === 'start') {
  common = merge(common, {
    devServer: {
      contentBase: distPath,
      compress: false,
      port: 9000
    }
  });
}

if (TARGET === 'build') {
  common = merge(common, {
    output: {
      publicPath: 'https://rikishi.info/assets/',
      filename: '[name].[chunkhash].js'
    },

    plugins: [
      new UglifyJSPlugin(uglifyConfig)
    ]
  });
}

module.exports = common;
