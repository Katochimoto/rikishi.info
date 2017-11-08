var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var homepage = 'https://rikishi.info';
var TARGET = process.env.npm_lifecycle_event; // start, build
var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

var options = {
  homepage: homepage,
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
      'react-dom',
      'jsrsasign',
      'openpgp'
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
            ],
            plugins: [
              'transform-react-jsx-img-import'
            ]
          }
        }
      },

      {
        test: /\.css$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: false,
                camelCase: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: false
              }
            }
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     sourceMap: true,
            //     ident: 'postcss',
            //     parser: 'sugarss',
            //     exec: true,
            //     plugins: function (loader) {
            //       return [
            //         require('postcss-import')({
            //           root: loader.resourcePath
            //         }),
            //         require('postcss-cssnext')(),
            //         require('autoprefixer')(),
            //       ];
            //     }
            //   }
            // },
            // {
            //   loader: 'sass-loader',
            //   options: {
            //     sourceMap: true
            //   }
            // }
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
		    loader: 'file-loader'
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([
      'dist'
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
      publicPath: path.join(homepage, 'assets'),
      filename: '[name].[chunkhash].js'
    },

    plugins: [
      new UglifyJSPlugin(uglifyConfig)
    ]
  });
}

module.exports = common;
