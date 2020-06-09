/* eslint-disable no-bitwise */

module.exports = (hashString) => {
  let hash = 0;

  for (let i = 0; i < hashString.length; i += 1) {
    const chr = hashString.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

/* eslint-enable */
