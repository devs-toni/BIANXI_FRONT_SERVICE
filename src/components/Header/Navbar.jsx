import React, { memo, useRef, useEffect } from 'react'
import { Logo, Navigator, Icon } from '../index';
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';
import { useUI } from '../../context/UIContext';

const Navbar = memo(({ items }) => {

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();
  
  const { extra } = useCart();
  const { getTotalPriceCart } = extra;

  const menuRef = useRef(null);
  const activatorRef = useRef(null);


  const clickOutsideHandler = event => {
    if (menuRef.current) {
      if (
        menuRef.current.contains(event.target) ||
        activatorRef.current.contains(event.target)
      ) {
        return;
      }
      //setIsNavShow(false);
    }
  };

  const showStyles = ui_state.menuIsOpen ? 'active' : '';
  const hideStyles = ui_state.menuIsOpen ? 'hide' : '';

  useEffect(() => {
    if (ui_state.menuIsOpen) {
      document.addEventListener("mousedown", clickOutsideHandler);
      document.getElementById('root').style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.addEventListener("mousedown", clickOutsideHandler);
      document.getElementById('root').style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  }, [ui_state.menuIsOpen]);

  return (
    <div className='navbar'>
      <Logo
        containerClass='navbar__container-logo'
        closeMenu={() => {ui_dispatch({type: UI_ACTIONS.CLOSE_MENU})}}
        logo={logo}
      />
      <Navigator
        containerClass={`${showStyles} navbar__nav`}
        innerRef={menuRef}
        items={items}
        closeMenu={() => {ui_dispatch({type: UI_ACTIONS.CLOSE_MENU})}}
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
          isNavShow={ui_state.menuIsOpen}
          handleMenu={() => {ui_dispatch({type: UI_ACTIONS.HANDLE_MENU})}}
          innerRef={activatorRef}
        />
      </div>
      <p className="navbar__charge" onClick={() => {ui_dispatch({type: UI_ACTIONS.HANDLE_CART})}}>{formatNumberES(getTotalPriceCart(), 2)} €</p>
    </div>
  )
})

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
}
export default Navbar;