import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const UserSection = ({ component: Component, ...rest }) => {

  const navigate = useNavigate();
  const { user_state } = useAuth();
  const { category, container, box, title } = rest;

  useEffect(() => {
    if (!user_state.isAuthenticated) {
      navigate("/");
    }
  }, [])

  return (
    <Component category={category} container={container} box={box} title={title} />
  )
}

export default UserSection