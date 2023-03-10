import LoginModal from './LoginModal';
import LoggedMenu from './LoggedMenu';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FAVOURITES_LINK, ORDERS_LINK } from '../../router/paths';
import { UI_ACTIONS, UI_SECTIONS } from '../../config/configuration';

const Login = () => {

  const navigate = useNavigate();

  const { uiState, handleUi } = useUI();
  const { userState, logout } = useAuth();

  const showFavourites = () => {
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE);
    navigate(FAVOURITES_LINK);
  }

  const showOrders = () => {
    handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE);
    navigate(ORDERS_LINK);
  }
  return (
    <>
      {
        userState.isAuthenticated
          ?
          <LoggedMenu
            closeHandler={() => handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE)}
            isOpen={uiState.loginIsOpen}
            logoutHandler={logout}
            username={userState.username}
            handlerFavourites={showFavourites}
            handlerOrders={showOrders}
          />
          :
          <LoginModal
            closeHandler={() => handleUi(UI_SECTIONS.LOGIN, UI_ACTIONS.CLOSE)}
            isOpen={uiState.loginIsOpen}
          />
      }
    </>
  )
}

export default Login;