import React, { memo, useRef } from 'react'
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

  const showStyles = ui_state.menuIsOpen ? 'active' : '';
  const hideStyles = ui_state.menuIsOpen ? 'hide' : '';

  const handleClickLogin = () => {
    ui_dispatch({ type: UI_ACTIONS.HANDLE_LOGIN })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_MENU })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })
  }

  const handleClickMenu = () => {
    ui_dispatch({ type: UI_ACTIONS.HANDLE_MENU })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })
  }

  const handleClickSearch = () => {
    ui_dispatch({ type: UI_ACTIONS.HANDLE_SEARCH })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_MENU })
  }

  const handleClickCart = () => {
    ui_dispatch({ type: UI_ACTIONS.HANDLE_CART })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_MENU })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })
  }

  const handleClickDropdown = () => {
    ui_dispatch({ type: UI_ACTIONS.CLOSE_CART })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_MENU })
    ui_dispatch({ type: UI_ACTIONS.CLOSE_SEARCH })
  }

  return (
    <div className='navbar'>
      <div>
        <Logo
          containerClass='navbar__container-logo'
          closeMenu={handleClickDropdown}
          logo={logo}
        />
      </div>
      <div className='navbar__options'>
        <Navigator
          containerClass={`${showStyles} navbar__options--nav`}
          innerRef={menuRef}
          items={items}
          closeMenu={handleClickDropdown}
        />
        <div className="navbar__options--icons">
          <Icon
            isMenu={false}
            isCart={false}
            containerClass={`${hideStyles} navbar__options--icons`}
            btnClass='user'
            icon={faUser}
            handler={handleClickLogin}
          />
          <Icon
            isMenu={false}
            isCart={true}
            containerClass={`${hideStyles} navbar__options--icons`}
            btnClass='cart'
            icon={faCartShopping}
            handler={handleClickCart}
          />
          <Icon
            isMenu={false}
            isCart={false}
            containerClass={`${hideStyles} navbar__options--icons`}
            btnClass='search'
            icon={faMagnifyingGlass}
            handler={handleClickSearch}
            innerRef={activatorRef}
          />
          <Icon
            isMenu={true}
            isCart={false}
            containerClass='navbar__options--icons'
            btnClass='hamburguer'
            icon={faBars}
            handler={handleClickMenu}
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