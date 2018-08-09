const loaderUtils = require('loader-utils');

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
    let content = require(${path});

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    // Export CSS Modules
    if (content.locals) {
      module.exports = content.locals;
    }

    // Foo
    module.exports.getCss = function() {
      return content.toString();
    };
  `;
};
