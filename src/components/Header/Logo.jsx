import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Logo = ({ containerClass, handler, logo }) => {
  return (
    <div className={containerClass}>
      <Link to='/'><img src={logo} alt="" onClick={handler} /></Link>
    </div>
  )
}

Logo.propTypes = {
  containerClass: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired
}

export default Logo;