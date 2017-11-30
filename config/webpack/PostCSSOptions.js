var path = require('path');

module.exports = function () {
  return [
    require('postcss-easy-import')({
      root: path.join(process.cwd(), 'src'),
      prefix: '_'
    }),
    // require('lost'),
    // require('precss')(),
    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-cssnext')({
      // features: {
      //   customProperties: {
      //     variables: {
      //       test: 'red'
      //     }
      //   }
      // }
    }),
    require('css-mqpacker')(),
    require('postcss-csso')()
  ];
};
