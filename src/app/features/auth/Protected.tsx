// API Connections
import { useGetAuthenticatedUserQuery } from '../users/users-api';

// React Router DOM
import { Navigate, useLocation } from 'react-router-dom';
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Protected = ({ children }: Props): React.JSX.Element => {
  const location = useLocation();
  const { data, isLoading } = useGetAuthenticatedUserQuery();

  if (!data && !isLoading) {
    return <Navigate to={route.login} state={{ from: location }} replace />;
  }

  return children;
};

export default Protected;
