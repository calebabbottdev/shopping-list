import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Redirect = ({ children }: Props) => {
  const location = useLocation();

  const authenticatedUser = useSelector(
    (state: RootState) =>
      state.users.queries['getAuthenticatedUser(undefined)']?.data
  );

  if (!authenticatedUser) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return children;
  }

  const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
  sessionStorage.removeItem('redirectAfterLogin');

  return <Navigate to={storedRedirect || route.home} replace />;
};

export default Redirect;
