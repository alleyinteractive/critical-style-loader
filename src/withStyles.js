import React from 'react';
import getDisplayName from 'utils/getDisplayName';
import isNode from 'utils/isNode';
import StyleContext from './styleContext';

function withStyles(...styles) {
  return function wrapWithStyles(WrappedComponent) {
    const StyleLogger = (props) => {
      if (! isNode()) {
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

    StyleLogger.displayName = getDisplayName('StyleLogger', WrappedComponent);

    return StyleLogger;
  };
}

export default withStyles;
