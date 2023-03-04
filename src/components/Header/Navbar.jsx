import React, { memo, useRef, useEffect } from 'react'
import { Logo, Navigator, Icon } from '../index';
import { faCartShopping, faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
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

  return (
    <div className='navbar'>
      <div>
        <Logo
          containerClass='navbar__container-logo'
          closeMenu={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_MENU }) }}
          logo={logo}
        />
      </div>
      <div className='navbar__options'>
        <Navigator
          containerClass={`${showStyles} navbar__options--nav`}
          innerRef={menuRef}
          items={items}
          closeMenu={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_MENU }) }}
        />
        <div className="navbar__options--icons">
          <Icon
            isMenu={false}
            isCart={false}
            containerClass={`${hideStyles} navbar__options--icons`}
            btnClass='user'
            icon={faUser}
            handler={() => { ui_dispatch({ type: UI_ACTIONS.HANDLE_LOGIN }) }}
          />
          <Icon
            isMenu={false}
            isCart={true}
            containerClass={`${hideStyles} navbar__options--icons`}
            btnClass='cart'
            icon={faCartShopping}
            handler={() => ui_dispatch({ type: UI_ACTIONS.HANDLE_CART })}
          />
          <Icon
            isMenu={false}
            isCart={false}
            containerClass={`${hideStyles} navbar__options--icons`}
            btnClass='search'
            icon={faMagnifyingGlass}
            handler={() => { ui_dispatch({ type: UI_ACTIONS.HANDLE_SEARCH }) }}
            innerRef={activatorRef}
          />
          <Icon
            isMenu={true}
            isCart={false}
            containerClass='navbar__options--icons'
            btnClass='hamburguer'
            icon={faBars}
            handler={() => { ui_dispatch({ type: UI_ACTIONS.HANDLE_MENU }) }}
            innerRef={activatorRef}
          />
          <p className="navbar__options--charge" onClick={() => { ui_dispatch({ type: UI_ACTIONS.HANDLE_CART }) }}>{formatNumberES(getTotalPriceCart(), 2)} €</p>
        </div>
      </div>
    </div>
  )
})

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
}
export default Navbar;