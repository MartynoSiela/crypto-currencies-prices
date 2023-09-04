/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const cssModulesTransformer = require('css-loader/dist/cjs.js');

module.exports = {
  process(src, filename, config, options) {
    return cssModulesTransformer.process(src, filename, config, options);
  },
};
