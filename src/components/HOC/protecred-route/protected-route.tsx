import { useLocation } from 'react-router-dom';
import {
  getIsAuth,
  getStatusLoading
} from '../../../services/slices/userSlice';
import { useSelector } from '../../../services/store';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  anonymous?: boolean;
};

const ProtectedRoute = ({
  children,
  anonymous = false
}: ProtectedRouteProps) => {
  const isAuth = useSelector(getIsAuth);
  const loading = useSelector(getStatusLoading);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (loading) return <Preloader />;

  if (anonymous && isAuth) {
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
