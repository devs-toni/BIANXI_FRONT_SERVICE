import React, { memo, useState, useRef, useEffect } from 'react'
import { Logo, Navigator, Icon } from '../index';
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';

const Navbar = memo(({ items }) => {
  const [isNavShow, setIsNavShow] = useState(false);
  const { extra, modal } = useCart();
  const { getTotalPriceCart } = extra;
  const { handleCart } = modal;

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

  const showStyles = isNavShow ? 'active' : '';
  const hideStyles = isNavShow ? 'hide' : '';

  useEffect(() => {
    if (isNavShow) {
      document.addEventListener("mousedown", clickOutsideHandler);
      document.getElementById('root').style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.addEventListener("mousedown", clickOutsideHandler);
      document.getElementById('root').style.overflow = 'auto';
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
        containerClass={`${showStyles} navbar__nav`}
        innerRef={menuRef}
        items={items}
      />
      <div className="navbar__extra-icons">
        <Icon
          containerClass={`${hideStyles} navbar__extra-icons`}
          icon={faCartShopping}
          isCart={true}
        />
        <Icon
          containerClass='navbar__extra-icons'
          icon={faBars}
          iconClose={faXmark}
          isCart={false}
          isNavShow={isNavShow}
          handleMenu={handleMenu}
          innerRef={activatorRef}
        />
      </div>
      <p className="navbar__charge" onClick={handleCart}>{formatNumberES(getTotalPriceCart(), 2)} €</p>
    </div>
  )
})

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
}
export default Navbar;