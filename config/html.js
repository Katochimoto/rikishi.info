var path = require('path');

module.exports = function (env, options) {
  var config = {
    title: 'Rikishi',
    inject: false,
    filename: path.join(options.distPath, 'index.html'),
    template: require('html-webpack-template'),
    hash: true,
    cache: true,
    chunksSortMode: 'dependency',
    appMountId: 'app',
    mobile: true,
    lang: 'en-US',
    alwaysWriteToDisk: true,
    links: [
      {
        href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300',
        rel: 'stylesheet'
      }
    ]
  };

  if (env === 'build') {
    config.hash = false;
    config.baseHref = options.homepage;

    config.minify = {
      minimize: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleTypeAttributes: true
    };

    config.meta = meta(options);
  }

  return config;
};

function meta (options) {
  return [
    {
      'http-equiv': 'Content-Security-Policy',
      content:
        "default-src 'self';" +
        "img-src 'self' data:;" +
        "font-src 'self' data:;" +
        "object-src 'none';" +
        "child-src 'none';" +
        "frame-src 'none';" +
        "form-action 'self';" +
        "upgrade-insecure-requests;" +
        "block-all-mixed-content;" +
        "base-uri " + options.homepage
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
    },
    {
      name: 'msapplication-TileColor',
      content: '#ffffff'
    },
    {
      name: 'msapplication-TileImage',
      content: '/ms-icon-144x144.png'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    }
  ];
}

/*
<link rel="manifest" href="/manifest.json">
*/
