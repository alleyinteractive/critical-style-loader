const md5 = require('blueimp-md5');

module.exports = function filterCriticalCss(css) {
  const key = md5(css);
  const styleRefs = window.__PRELOADED_STYLES__ || {}; // eslint-disable-line no-underscore-dangle
  if (styleRefs[key]) {
    // https://github.com/webpack-contrib/style-loader/pull/322
    // https://github.com/webpack-contrib/style-loader/issues/321
    return module.hot ? ' ' : false;
  }

  return css;
};
