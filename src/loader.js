const loaderUtils = require('loader-utils');
/**
 *
 */
module.exports = function loader() {};

/**
 *
 * @param request
 * @returns {string}
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
