/**
 * A container for critical path CSS.
 */
export default class CriticalCssBuilder {
  map = {};

  /* eslint-disable no-bitwise */
  hashCode = (string) => {
    let hash = 0;
    let chr;

    for (let i = 0; i < string.length; i += 1) {
      chr = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  /* eslint-enable */

  /**
   * Add a CSS module's css to the map.
   *
   * @param {object} styles - A CSS module export.
   */
  addCss = (styles) => {
    const cssModules = styles && 'function' === typeof styles.getCss ?
      styles.getCss() :
      false;

    if (! cssModules) {
      return;
    }

    (cssModules || []).forEach((module) => {
      const [,css] = module;
      const key = this.hashCode(css);
      if (! this.map[key]) {
        this.map[key] = css;
      }
    });
  };

  /**
   * Encode the map to be rendered in a response. Map values are removed for
   * simplicity, because we only need to check that a key exists to know a
   * particular CSS module has been rendered as critical css.
   *
   * @returns {string}
   */
  getEncodedMap = () => {
    const mapSimplified = Object
      .keys(this.map)
      .reduce((acc, key) => ({
        ...acc,
        [key]: true,
      }), {});

    return `window.${__CRITICAL_CSS_STYLE_LOADER_KEYS__} = ${JSON.stringify(mapSimplified)}`; // eslint-disable-line no-undef, max-len
  };

  /**
   * Get all CSS as a string.
   *
   * @returns {string}
   */
  getCss = () => Object.values(this.map).join('');
}
