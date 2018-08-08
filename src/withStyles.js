import React from 'react';
import StyleContext from './styleContext';

function withStyles(...styles) {
  return function wrapWithStyles(WrappedComponent) {
    const StyleLogger = (props) => {
      const isServer = 'undefined' !== typeof process &&
        process.release &&
        'node' === process.release.name;

      //
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
