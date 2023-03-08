import LoginModal from './LoginModal';
import LoggedMenu from './LoggedMenu';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FAVOURITES_LINK, ORDERS_LINK } from '../../router/paths';

const Login = () => {

  const navigate = useNavigate();

  const { handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch, UI_ACTIONS } = handleUi();

  const { user_state, logout } = useAuth();

  const showFavourites = () => {
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    navigate(FAVOURITES_LINK);
  }

  const showOrders = () => {
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    navigate(ORDERS_LINK);
  }
  return (
    <>
      {
        user_state.isAuthenticated
          ?
          <LoggedMenu
            closeHandler={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN }) }}
            isOpen={ui_state.loginIsOpen}
            logoutHandler={logout}
            username={user_state.username}
            handlerFavourites={showFavourites}
            handlerOrders={showOrders}
          />
          :
          <LoginModal
            closeHandler={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN }) }}
            isOpen={ui_state.loginIsOpen}
          />
      }
    </>
  )
}

export default Login;