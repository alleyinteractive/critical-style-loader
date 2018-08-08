import md5 from 'blueimp-md5';

export default class CriticalCssBuilder {
  map = {};

  /**
   *
   * @param styles
   */
  addStyles = (styles) => {
    const css = styles && 'function' === typeof styles.getContent ?
      styles.getContent() :
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
   *
   * @returns {string}
   */
  getEncodedMap = () => {
    const mapAbbreviated = Object
      .keys(this.map)
      .reduce((acc, key) => ({
        ...acc,
        [key]: true,
      }), {});

    return JSON.stringify(mapAbbreviated);
  };

  /**
   *
   * @returns {string}
   */
  getCss = () => Object.values(this.map).join('');
}
