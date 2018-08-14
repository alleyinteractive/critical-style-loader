import React from 'react';
import PropTypes from 'prop-types';

const StyleContext = React.createContext(() => {});

StyleContext.Provider.propTypes = {
  value: PropTypes.func.isRequired,
};

export default StyleContext;
