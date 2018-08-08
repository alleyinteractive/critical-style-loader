import React from 'react';
import StyleContext from './styleContext';

/**
 * Create a HoC that will log each CSS module used by a component.
 *
 * @param {object[]} styles - A collection of CSS module exports
 * @returns {function} - React component
 */
function withStyles(...styles) {
  return function wrapWithStyles(WrappedComponent) {
    const StyleLogger = (props) => {
      const isServer = 'undefined' !== typeof process &&
        process.release &&
        'node' === process.release.name;

      // style-loader will handle adding styles in the browser.
      if (! isServer) {
        return <WrappedComponent {...props} />;
      }

      return (
        <StyleContext.Consumer>
          {(onLoadStyle) => {
            styles.forEach(onLoadStyle);
            return <WrappedComponent {...props} />;
          }}
        </StyleContext.Consumer>
      );
    };

    const componentName = WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component';

    StyleLogger.displayName = `StyleLogger(${componentName})`;

    return StyleLogger;
  };
}

export default withStyles;
