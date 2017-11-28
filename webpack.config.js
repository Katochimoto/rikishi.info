var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var homepage = require('./package.json').homepage;
var TARGET = process.env.npm_lifecycle_event; // start, build
var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var outputPath = path.join(distPath, 'assets');

var options = {
  homepage: homepage,
  srcPath: srcPath,
  distPath: distPath
};
var defineConfig = require('./config/define')(TARGET);
var uglifyConfig = require('./config/uglify')(TARGET);
var htmlConfig = require('./config/html')(TARGET, options);

var common = {
  context: srcPath,

  entry: {
    main: path.join(srcPath, 'main.js')
  },

  output: {
    path: outputPath,
    publicPath: '/assets/',
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js' // chunk.[id].[chunkhash:8].js
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
              ['env', {
                loose: true,
                modules: false
              }],
              'react'
            ],
            plugins: [
              'transform-react-jsx-img-import',
              'transform-object-rest-spread'
            ]
          }
        }
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: false,
                camelCase: true,
                localIdentName: '[local]--[hash:base64:5]', // [path][name]__
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: [
                  require('postcss-easy-import')({
                    root: srcPath,
                    prefix: '_'
                  }),
                  // require('lost'),
                  // require('precss')(),
                  require('postcss-mixins')(),
                  require('postcss-cssnext')({
                    // features: {
                    //   customProperties: {
                    //     variables: {
                    //       test: 'red'
                    //     }
                    //   }
                    // }
                  }),
                  require('css-mqpacker')()
                ]
              }
            }
          ]
        })
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
		    use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[hash:8].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },

      {
        test: /\.(txt)$/i,
        use: [
          'raw-loader'
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

    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin(defineConfig),

    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') !== -1;
      }
    }),

    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),

    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Rikishi',
      short_name: 'Rikishi',
      description: 'Rikishi contact details',
      background_color: '#ffffff',
      display: 'browser',
      lang: 'en-US',
      orientation: 'any',
      scope: '/',
      start_url: '/?utm_source=web_app_manifest',
      icons: [
        {
          src: path.join(srcPath, 'images', 'avatar.jpg'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: 'manifest/'
        }
      ]
    }),

    new FaviconsWebpackPlugin({
      logo: path.join(srcPath, 'images', 'avatar.jpg'),
      prefix: 'icons-[hash:8]/',
      // emitStats: true,
      // statsFilename: 'iconstats-[hash:8].json',
      persistentCache: true,
      inject: true,
      // background: '#ffffff',
      // title: 'Rikishi',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: false,
        yandex: false
      }
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: TARGET === 'start',
      allChunks: true
    }),

    new CopyWebpackPlugin([
      {
        from: 'robots.txt',
        to: distPath
      },
      {
        from: 'sitemap.xml',
        to: distPath
      },
      {
        from: 'rss.xml',
        to: distPath
      }
    ]),

    new HtmlWebpackPlugin(merge(htmlConfig, {
      chunks: ['main', 'vendor']
    })),

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
      publicPath: homepage + '/assets/'
    },

    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),

      new UglifyJSPlugin(uglifyConfig)

      // new CompressionPlugin({
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$/, // |\.html$
      //   threshold: 10240,
      //   minRatio: 0.8,
      //   deleteOriginalAssets: true
      // })
    ]
  });
}

module.exports = common;
