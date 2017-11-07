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
    favicon: path.join(options.srcPath, 'images/icon/favicon.ico')
  };

  if (env === 'build') {
    config.hash = false;
    config.baseHref = 'https://rikishi.info/';

    config.minify = {
      minimize: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleTypeAttributes: true
    };

    config.meta = meta();
    config.links = links();
  }

  return config;
};

function links () {
  return [
    '57x57',
    '60x60',
    '72x72',
    '76x76',
    '114x114',
    '120x120',
    '144x144',
    '152x152',
    '180x180'
  ].map(function (size) {
    return {
      href: '/apple-icon-' + size + '.png',
      rel: 'apple-touch-icon',
      sizes: size
    };
  }).concat([
    '32x32',
    '96x96',
    '16x16'
  ].map(function (size) {
    return {
      href: '/favicon-' + size + '.png',
      rel: 'icon',
      sizes: size,
      type: 'image/png'
    };
  }), {
    href: '/android-icon-192x192.png',
    rel: 'icon',
    sizes: '192x192',
    type: 'image/png'
  });
}

function meta () {
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
        "base-uri https://rikishi.info/"
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
