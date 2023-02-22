import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

const Advantage = ({ name, icon, description }) => {
  return (
    <div className='advantages__advantage'>
      <FontAwesomeIcon icon={icon} className='advantages__advantage--image' />
      <p className='advantages__advantage--name'>{name}</p>
      {description && <p className='advantages__advantage--description'>{description}</p>}
    </div>
  )
}

Advantage.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default Advantage;