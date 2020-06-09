const loaderUtils = require('loader-utils');
const { GLOBAL_HOOK } = require('./constants');

/**
 * Our loader callback is empty, because we want to short circuit the process by
 * returning a module response in the pitching phase.
 */
module.exports = function loader() {};

/**
 * Pass through the locally scoped identifiers from css-loader, and export a
 * function to retrieve the CSS body as a string.
 *
 * @param {string} request - The webpack module request string
 * @returns {string} - The module code to be executed.
 */
module.exports.pitch = function prepareModule(request) {
  if (this.cacheable) {
    this.cacheable();
  }

  const path = loaderUtils.stringifyRequest(this, `!!${request}`);
  return `
    var content = require(${path});
    var hashCode = require('critical-style-loader/lib/hashCode.js');

    if (
      'undefined' !== typeof window &&
      'undefined' !== typeof document
    ) {
      var preRendered = content.some(function(module) {
        var css = module[1];
        var id = hashCode(css);

        if (window.${GLOBAL_HOOK} && window.${GLOBAL_HOOK}[id]) {
          return true;
        }

        return false;
      });

      if (preRendered) {
        module.exports = '/* CSS output skipped for ' +
          module.id +
          ' prerendered server-side */';
      } else {
        module.exports = content;
      }
    } else {
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }

      // Export CSS Modules
      if (content.locals) {
        module.exports = content.locals;
      }

      // Provide getter for raw CSS.
      module.exports.getCss = function() {
        return content;
      };
    }
  `;
};
