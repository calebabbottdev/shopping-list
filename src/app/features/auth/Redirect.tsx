import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Redirect = ({ children }: Props) => {
  const location = useLocation();

  const queryState = useSelector(
    (state: RootState) => state.users.queries['getAuthenticatedUser(undefined)']
  );
  const authenticatedUser = queryState?.data;
  const isLoading = queryState?.status === 'pending';

  if (isLoading) {
    // Optional: Add a spinner here
    return null;
  }

  if (!authenticatedUser) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return children;
  }

  const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
  if (storedRedirect) {
    sessionStorage.removeItem('redirectAfterLogin');
    return <Navigate to={storedRedirect} replace />;
  }

  return <Navigate to={route.home} replace />;
};

export default Redirect;
