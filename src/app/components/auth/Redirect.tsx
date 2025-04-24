// API Connections
import { useGetAuthenticatedUserQuery } from '../../features/users/users-api';

// React Router DOM
import { Navigate } from 'react-router-dom';

// Routes
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Redirect = ({ children }: Props) => {
  const { data } = useGetAuthenticatedUserQuery();

  return data ? <Navigate to={route.home} replace /> : children;
};

export default Redirect;
