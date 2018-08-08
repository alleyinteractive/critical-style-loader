import md5 from 'blueimp-md5';
import { GLOBAL_HOOK } from './constants';

/**
 * Check the global window key for the critical css map. If style-loader
 * loads a CSS module with the same key, skip adding a new style tag to avoid
 * duplicating styles.
 *
 * Since this function is imported directly by Webpack we have to use Common JS syntax.
 *
 * @param {string} css
 * @returns {string|bool}
 */
module.exports = function filterCriticalCss(css) {
  const key = md5(css);
  const styleRefs = window[GLOBAL_HOOK] || {}; // eslint-disable-line no-undef
  if (styleRefs[key]) {
    // There is an issue in style loader where the optional transform function
    // is not called if a module was skipped, but then later is added with HMR.
    // This causes HMR to break for any critical path css. To get around that
    // temporarily, we return a non falsy value, so that HMR can pick up
    // changes, but the value won't have affect on styles in the browser.

    // @see https://github.com/webpack-contrib/style-loader/issues/321
    // @todo remove when https://github.com/webpack-contrib/style-loader/pull/322 is merged.
    return module.hot ? ' ' : false;
  }

  return css;
};
