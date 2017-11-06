module.exports = function () {
  return {
    cache: false,
    parallel: 2,
    sourceMap: true,
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      output: {
        beautify: false,
        comments: false
      }
    }
  };
};
