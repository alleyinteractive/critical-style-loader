import md5 from 'blueimp-md5';
import { GLOBAL_HOOK } from './constants';

/**
 * A container for critical path CSS.
 */
export default class CriticalCssBuilder {
  map = {};

  /**
   * Add a CSS module's css to the map.
   * @param {object} styles - A CSS module export.
   */
  addCss = (styles) => {
    const css = styles && 'function' === typeof styles.getCss ?
      styles.getCss() :
      false;

    if (! css) {
      return;
    }

    const key = md5(css);
    if (! this.map[key]) {
      this.map[key] = css;
    }
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

    return `window.${GLOBAL_HOOK} = ${JSON.stringify(mapSimplified)}`;
  };

  /**
   * Get all CSS as a string.
   * @returns {string}
   */
  getCss = () => Object.values(this.map).join('');
}
