var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event; // start, build
var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

var common = {
  entry: {
    main: path.join(srcPath, 'main.js'),
    // vendor: [
    // ]
  },

  output: {
    path: path.join(distPath, 'assets'),
    publicPath: '//rikishi.info/assets/',
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    })
  ]
};

if (TARGET === 'build') {
  common = merge(common, {

  });
}

module.exports = common;
