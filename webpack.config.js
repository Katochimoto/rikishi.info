var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('./config/webpack/HtmlWebpackPlugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var SriPlugin = require('webpack-subresource-integrity');
var InlineCSP = require('./config/webpack/InlineCSP');
var package = require('./package.json');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var NODE_ENV = process.env.npm_lifecycle_event === 'build' ?
  'production' :
  'development';
var isDev = NODE_ENV === 'development';
var homepage = isDev ? '' : package.homepage;
var GOOGLE_TAG = package.googleTag;

var common = {
  mode: NODE_ENV,

  context: srcPath,

  entry: {
    main: path.join(srcPath, 'main.js'),
    inline: path.join(srcPath, 'inline.js'),
  },

  output: {
    path: distPath,
    publicPath: homepage + '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js',
    crossOriginLoading: 'anonymous'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'preprocess-loader',
            options: {
              'NODE_ENV': NODE_ENV,
              'GOOGLE_TAG': GOOGLE_TAG
            }
          },
          {
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
        ]
      },

      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: false,
              minimize: false,
              camelCase: true,
              localIdentName: '[local]--[hash:base64:5]',
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              plugins: require('./config/webpack/PostCSSOptions')()
            }
          }
        ]
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
              limit: 1,
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

  optimization: {
    splitChunks: {
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          enforce: true,
          chunks: 'async',
          priority: 0
        },
        commons: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: -10
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          chunks: 'async'
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin([ 'dist/**/*' ], { verbose: true }),
    (isDev ? null : new BundleAnalyzerPlugin({ analyzerMode: 'static' })),
    (isDev ? null : new webpack.optimize.OccurrenceOrderPlugin()),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new CopyWebpackPlugin([
      {
        from: 'robots.txt',
        to: distPath
      },
      {
        from: 'sitemap.xml',
        to: distPath
      }
    ]),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Rikishi',
      short_name: 'Rikishi',
      description: 'Rikishi contact details',
      background_color: '#9cf1fa',
      theme_color: '#9cf1fa',
      display: 'minimal-ui',
      lang: 'en-US',
      orientation: 'any',
      scope: '/',
      start_url: '/?utm_source=web_app_manifest',
      icons: [{
        src: path.join(srcPath, 'images', 'avatar.jpg'),
        sizes: [96, 128, 192, 256, 512],
        destination: 'manifest/'
      }]
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css'
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(srcPath, 'images', 'avatar.jpg'),
      prefix: 'icons-[hash:8]/',
      persistentCache: true,
      inject: true,
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
    (isDev ? null : new SWPrecacheWebpackPlugin({
      cacheId: 'rikishi-info',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: !isDev,
      navigateFallback: homepage + '/index.html',
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /\.cache$/,
        /\.webapp$/,
        /\.xml$/,
        /\.txt$/,
        /manifest.*\.json$/
      ]
    })),
    new HtmlWebpackPlugin({
      title: 'Rikishi',
      chunks: ['main', 'vendor', 'inline'],
      filename: 'index.html',
      template: 'main.ejs',
      inject: false,
      hash: isDev,
      cache: true,
      chunksSortMode: 'dependency',
      appMountId: 'app',
      mobile: true,
      lang: 'en-US',
      alwaysWriteToDisk: true,
      googleTag: isDev ? false : { trackingId: GOOGLE_TAG },
      baseHref: homepage,
      reInlineCss: /inline(\.[0-9a-z]+)?\.css$/
    }, {
      isDev: isDev
    }),
    (isDev ? new HtmlWebpackHarddiskPlugin() : null),
    new InlineCSP({ disable: isDev }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: !isDev
    })
  ].filter(function (item) {
    return item !== null;
  })
};

if (isDev) {
  common.devServer = {
    contentBase: distPath,
    compress: false,
    port: 9000
  };
}

//     new CompressionPlugin({
  //       asset: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: /\.js$/, // |\.html$
  //       threshold: 10240,
  //       minRatio: 0.8,
  //       deleteOriginalAssets: true
  //     })

module.exports = [
  common
];
