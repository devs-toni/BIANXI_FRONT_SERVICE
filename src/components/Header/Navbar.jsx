import React, { memo, useRef } from 'react'
import { Logo, Navigator, Icon } from '../index';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';
import { useUI } from '../../context/UIContext';
import MenuIcon from './MenuIcon';

const Navbar = memo(({ items }) => {

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const { extra } = useCart();
  const { getTotalPriceCart } = extra;

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
          handler={handleClickDropdown}
          logo={logo}
        />
      </div>
      <div className='navbar__options'>
        <Navigator
          parentStyles={`${showStyles} navbar__options--nav`}
          items={items}
          handler={handleClickDropdown}
        />
        <div className="navbar__options--icons">
          <Icon
            parentStyles={`${hideStyles} navbar__options--icons`}
            btnStyles='user'
            icon={faUser}
            handler={handleClickLogin}
          />
          <Icon
            isCartBtn={true}
            parentStyles={`${hideStyles} navbar__options--icons`}
            btnStyles='cart'
            icon={faCartShopping}
            handler={handleClickCart}
          />
          <Icon
            parentStyles={`${hideStyles} navbar__options--icons`}
            btnStyles='search'
            icon={faMagnifyingGlass}
            handler={handleClickSearch}
          />
          <MenuIcon
            parentStyles='navbar__options--icons'
            isOpen={ui_state.menuIsOpen}
            handler={handleClickMenu}
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