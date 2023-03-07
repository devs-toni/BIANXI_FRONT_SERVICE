import LoginModal from './LoginModal';
import LoggedMenu from './LoggedMenu';
import { useUI } from '../../context/UIContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ isLogged }) => {

  const navigate = useNavigate();

  const { handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch, UI_ACTIONS } = handleUi();

  const { handleUser } = useUser();
  const { state: user_state, dispatch: user_dispatch, USER_ACTIONS } = handleUser();

  const showFavourites = () => {
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    navigate("/product-category/bycicles/favourites");
  }

  const showOrders = () => {
    ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN })
    navigate("/product-category/bycicles/orders");
  }
  return (
    <>
      {
        isLogged
          ?
          <LoggedMenu
            closeHandler={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN }) }}
            isOpen={ui_state.loginIsOpen}
            logoutHandler={() => user_dispatch({ type: USER_ACTIONS.LOGOUT })}
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