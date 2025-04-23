// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

// React Router DOM
import { Navigate, useLocation } from 'react-router-dom';
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Protected = ({ children }: Props): React.JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={route.login} state={{ from: location }} replace />;
  }

  return children;
};

export default Protected;
