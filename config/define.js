module.exports = function (env) {
  var config = {
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  };

  if (env === 'build') {
    config['process.env'] = {
      NODE_ENV: JSON.stringify('production')
    };
  }

  return config;
};
