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
module.exports = function insert(element) {
  const key = md5(element.textContent);
  const styleRefs = window[GLOBAL_HOOK] || {}; // eslint-disable-line no-undef
  const parent = document.querySelector('head');
  // eslint-disable-next-line no-underscore-dangle
  const lastInsertedElement =
    window._lastElementInsertedByStyleLoader;

  console.log(key, styleRefs);

  if (! lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild);
  } else if (lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling);
  } else {
    parent.appendChild(element);
  }

  // eslint-disable-next-line no-underscore-dangle
  window._lastElementInsertedByStyleLoader = element;
};
