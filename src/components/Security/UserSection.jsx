import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const UserSection = ({ children }) => {

  const { user_state } = useAuth();

  return user_state.isAuthenticated ? children : <Navigate to="/"/>
}

export default UserSection