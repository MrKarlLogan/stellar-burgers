import { useLocation } from 'react-router-dom';
import {
  getIsAuth,
  getStatusAuthLoading,
  getUser,
  getUserData
} from '../../../services/slices/userSlice';
import { useSelector } from '../../../services/store';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuth);
  const loading = useSelector(getStatusAuthLoading);
  const location = useLocation();

  if (loading) return <Preloader />;

  if (!isAuth || !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
