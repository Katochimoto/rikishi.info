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
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self' ; img-src 'self' data: ; font-src 'self' data: ; object-src 'none' ; child-src 'none' ; frame-src 'none' ; form-action 'self' ; upgrade-insecure-requests; block-all-mixed-content; base-uri https://rikishi.info/"
        },
        {
          'http-equiv': 'X-XSS-Protection',
          content: '1;mode=block'
        },
        {
          'http-equiv': 'Strict-Transport-Security',
          content: 'max-age=31536000; includeSubDomains; preload'
        },
        {
          'http-equiv': 'X-Frame-Options',
          content: 'DENY'
        },
        {
          'http-equiv': 'X-Content-Type-Options',
          content: 'nosniff'
        },
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
  ]
};

if (TARGET === 'start') {
  common = merge(common, {
    devServer: {
      contentBase: distPath,
      compress: true,
      port: 9000
    }
  });
}

if (TARGET === 'build') {
  common = merge(common, {

  });
}

module.exports = common;
