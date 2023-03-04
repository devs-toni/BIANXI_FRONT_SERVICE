import React from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/GlobalContext';
import { useUI } from '../../context/UIContext';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoggedMenu = ({ closeIcon }) => {

  const { text } = useLanguage();
  const navigate = useNavigate();
  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const { USER_ACTIONS, handleUser } = useUser();
  const { state: user_state, dispatch: user_dispatch } = handleUser();

  const showLikes = () => {
    navigate("/")
  }
  const isActiveStyles = ui_state.loginIsOpen ? 'active' : '';

  return (
    <div className={`${isActiveStyles} login`}>
      <p className='login__name'>{text.login.hi} {user_state.username}!</p>
      <p className='login__link' onClick={showLikes}>{text.login.likes}</p>
      <p className='login__link' onClick={() => user_dispatch({ type: USER_ACTIONS.LLOGOUT })}>{text.login.logout}</p>
    </div>
  )
}

LoggedMenu.propTypes = {

}
export default LoggedMenu;