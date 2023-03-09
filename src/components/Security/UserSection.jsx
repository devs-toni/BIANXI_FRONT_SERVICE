import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const UserSection = ({ children }) => {

  const { userState } = useAuth();

  return userState.isAuthenticated ? children : <Navigate to="/"/>
}

export default UserSection