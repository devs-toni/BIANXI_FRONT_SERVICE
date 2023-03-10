import React, { memo } from 'react'
import { Logo, Navigator, Icon } from '../index';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { formatNumberES } from '../../helpers/utils';
import { useUI } from '../../context/UIContext';
import MenuIcon from './MenuIcon';
import { useSearchParams } from 'react-router-dom';
import { UI_ACTIONS, UI_SECTIONS } from '../../configuration';
import spa from '../../assets/images/lang/spa.png';
import eng from '../../assets/images/lang/eng.png';
import { useLanguage } from '../../context/GlobalContext';

const Navbar = memo(({ items }) => {

  const { uiState, handleUi } = useUI();

  const { cartState } = useCart();
  const { totalAmount: total } = cartState;

  const [searchParams, setSearchParams] = useSearchParams();

  const { handleLanguage } = useLanguage();

  const showStyles = uiState.menuIsOpen ? 'active' : '';
  const hideStyles = uiState.menuIsOpen ? 'hide' : '';

  const handleClickLogin = () => {
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.HANDLE)
    handleUi(UI_SECTIONS.MENU, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.SEARCH, UI_ACTIONS.CLOSE)
  }

  const handleClickMenu = () => {
    handleUi(UI_SECTIONS.MENU, UI_ACTIONS.HANDLE)
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.SEARCH, UI_ACTIONS.CLOSE)
  }

  const handleClickSearch = () => {
    setSearchParams("");
    handleUi(UI_SECTIONS.SEARCH, UI_ACTIONS.HANDLE)
    handleUi(UI_SECTIONS.MENU, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE)
  }

  const handleClickCart = () => {
    handleUi(UI_SECTIONS.CART, UI_ACTIONS.HANDLE)
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.MENU, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.SEARCH, UI_ACTIONS.CLOSE)

  }

  const handleClickDropdown = () => {
    handleUi(UI_SECTIONS.SEARCH, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.MENU, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE)
    handleUi(UI_SECTIONS.CART, UI_ACTIONS.CLOSE)
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
        <div className='navbar__options--lang'>
          <img src={spa} alt="spa" name="spa" onClick={handleLanguage} />
        </div>
        <div className='navbar__options--lang'>
          <img src={eng} alt="eng" name="eng" onClick={handleLanguage} />
        </div>
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
            isOpen={uiState.menuIsOpen}
            handler={handleClickMenu}
          />
          <p className="navbar__options--charge" onClick={() => handleUi(UI_SECTIONS.CART, UI_ACTIONS.HANDLE)}>{formatNumberES(total, 2)} €</p>
        </div>
      </div>
    </div>
  )
})

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
}
export default Navbar;