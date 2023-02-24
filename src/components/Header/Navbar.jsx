import React, { memo } from 'react'
import { useState, useRef, useEffect } from 'react'
import logo from '../../assets/images/logo.png';
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Navigator from './Navigator';
import IconsContainer from './IconsContainer';

const Navbar = memo(({ items }) => {
  const [isNavShow, setIsNavShow] = useState(false);

  const menuRef = useRef(null);
  const activatorRef = useRef(null);

  const handleMenu = (e) => {
    setIsNavShow(!isNavShow);
  }

  const closeMenu = (e) => {
    isNavShow && setIsNavShow(false);
  }

  const clickOutsideHandler = event => {
    if (menuRef.current) {
      if (
        menuRef.current.contains(event.target) ||
        activatorRef.current.contains(event.target)
      ) {
        return;
      }
      setIsNavShow(false);
    }
  };


  useEffect(() => {
    if (isNavShow) {
      document.addEventListener("mousedown", clickOutsideHandler);
      document.getElementById('root').style.overflow = 'hidden';
      document.querySelector('.navbar__extra-icons--cart').style.opacity = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.addEventListener("mousedown", clickOutsideHandler);
      document.getElementById('root').style.overflow = 'auto';
      document.querySelector('.navbar__extra-icons--cart').style.opacity = '1';
      document.body.style.overflow = 'auto';
    }
  }, [isNavShow]);

  return (
    <div className='navbar'>
      <Logo
        containerClass='navbar__container-logo'
        closeMenu={closeMenu}
        logo={logo}
      />
      <Navigator
        containerClass={`navbar__nav ${isNavShow ? 'active' : ''}`}
        innerRef={menuRef}
        items={items}
      />
      <div className="navbar__extra-icons">
        <IconsContainer
          containerClass='navbar__extra-icons'
          icon={faCartShopping}
          isCart={true}
        />
        <IconsContainer
          containerClass='navbar__extra-icons'
          icon={faBars}
          iconClose={faXmark}
          isCart={false}
          isNavShow={isNavShow}
          handleMenu={handleMenu}
          innerRef={activatorRef}
        />
      </div>
    </div>
  )
})

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
}
export default Navbar;