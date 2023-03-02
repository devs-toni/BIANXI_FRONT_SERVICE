import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ text, containerClass }) => {
  
  return (
    <div className={containerClass}>
      <p>{text}</p>
    </div>
  )
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired
}
export default Badge;