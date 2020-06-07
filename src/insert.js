/* eslint-disable no-undef, no-bitwise, no-underscore-dangle */

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
  function hashCode(string) {
    let hash = 0;
    let chr;

    for (let i = 0; i < string.length; i += 1) {
      chr = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  const key = hashCode(element.textContent);
  const styleRefs = window.__CRITICAL_CSS_STYLE_LOADER_KEYS__ || {};
  const parent = document.querySelector('head');
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

  window._lastElementInsertedByStyleLoader = element;
};

/* eslint-enable */
