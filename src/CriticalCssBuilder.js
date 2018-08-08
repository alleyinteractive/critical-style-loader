import md5 from 'blueimp-md5';

export default class CriticalCssBuilder {
  map = {};

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

  getEncodedMap = () => {
    const mapAbbreviated = Object
      .keys(this.map)
      .reduce((acc, key) => ({
        ...acc,
        [key]: true,
      }), {});

    return JSON.stringify(mapAbbreviated);
  };

  getCss = () => Object.values(this.map).join('');
}
