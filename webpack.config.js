var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event; // start, build
var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

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
    publicPath: '/assets/', // https://rikishi.info/assets/
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react'
            ]
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

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

    //new webpack.optimize.UglifyJsPlugin(),

    new HtmlWebpackPlugin({
      title: 'Rikishi',
      inject: false,
      filename: path.join(distPath, 'index.html'),
      template: require('html-webpack-template'),
      hash: true,
      cache: true,
      chunksSortMode: 'dependency',
      appMountId: 'app',
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        },
        {
          name: 'google',
          content: 'notranslate'
        }
      ],
      mobile: true,
      lang: 'en-US',
      baseHref: '/', // https://rikishi.info/
      minify: {
        minimize: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeScriptTypeAttributes: true,
        removeStyleTypeAttributes: true
      }
    })
  ],

  devServer: {
    contentBase: distPath,
    compress: true,
    port: 9000
  }
};

if (TARGET === 'build') {
  common = merge(common, {

  });
}

module.exports = common;
