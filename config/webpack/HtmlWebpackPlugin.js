var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (config, options) {
  config = config || {};

  var symbols = path.join(process.cwd(), 'node_modules/calendar-icons/dist/svg/symbols.svg');
  var svgIcons = fs.readFileSync(symbols, 'utf-8');

  config.svgIcons = svgIcons;

  if (!options.isDev) {
    config.minify = {
      minimize: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: false,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleTypeAttributes: true
    };
  }

  config.links = [
    {
      rel: 'preconnect',
      href: 'https://www.googletagmanager.com'
    },
    {
      rel: 'preconnect',
      href: 'https://www.google-analytics.com'
    },
    {
      rel: 'preconnect',
      href: 'https://s.gravatar.com'
    }
  ];

  config.meta = [
    {
      'http-equiv': 'Content-Security-Policy',
      content: options.isDev ? "default-src 'self' 'unsafe-inline' data: *" :
        "default-src 'self';" +
        "script-src 'self' https://www.googletagmanager.com;" +
        "img-src 'self' https://s.gravatar.com data:;" +
        "font-src 'self' data:;" +
        "object-src 'none';" +
        "child-src 'none';" +
        "frame-src 'none';" +
        "form-action 'self';" +
        "upgrade-insecure-requests;" +
        "block-all-mixed-content;" +
        "base-uri " + config.baseHref || '/'
    },
    {
      'http-equiv': 'X-XSS-Protection',
      content: '1;mode=block'
    },
    {
      'http-equiv': 'Strict-Transport-Security',
      content: 'max-age=31536000; includeSubDomains; preload'
    },
    // {
    //   'http-equiv': 'X-Frame-Options',
    //   content: 'DENY'
    // },
    {
      'http-equiv': 'X-Content-Type-Options',
      content: 'nosniff'
    },
    {
      name: 'description',
      content: 'Rikishi contact details'
    },
    {
      name: 'google',
      content: 'notranslate'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    }
  ];

  return new HtmlWebpackPlugin(config);
};
