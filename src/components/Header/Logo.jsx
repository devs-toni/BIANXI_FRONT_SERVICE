import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Logo = ({ containerClass, closeMenu, logo }) => {
  return (
    <div className={containerClass}>
      <Link to='/'><img src={logo} alt="" onClick={closeMenu} /></Link>
    </div>
  )
}

Logo.propTypes = {
  containerClass: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired
}

export default Logo;