import md5 from 'blueimp-md5';

/**
 *
 * @param css
 * @returns {*}
 */
export default function filterCriticalCss(css) {
  const key = md5(css);
  const styleRefs = window.__CRITICAL_CSS_STYLE_LOADER_KEYS__ || {}; // eslint-disable-line no-underscore-dangle, no-undef
  if (styleRefs[key]) {
    // https://github.com/webpack-contrib/style-loader/pull/322
    // https://github.com/webpack-contrib/style-loader/issues/321
    return module.hot ? ' ' : false;
  }

  return css;
}
