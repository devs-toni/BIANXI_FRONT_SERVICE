import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLanguage } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext';

const LoginModal = ({ closeIcon }) => {

  const { text } = useLanguage();

  const { UI_ACTIONS, handleUi } = useUI();
  const { state: ui_state, dispatch: ui_dispatch } = handleUi();

  const isActiveStyles = ui_state.loginIsOpen ? 'active' : '';

  return (
    <div className={`${isActiveStyles} login`}>
      <h2 className="login__title">{text.login.signin}</h2>
      <FontAwesomeIcon
        icon={closeIcon}
        className="login__close"
        onClick={() => { ui_dispatch({ type: UI_ACTIONS.CLOSE_LOGIN }) }}
      />
      <Form />
      <Link className='login__register'>{text.login.create}</Link>
    </div>
  )
}

LoginModal.propTypes = {

}
export default LoginModal;