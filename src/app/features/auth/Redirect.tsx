// React Router DOM
import { Navigate, useLocation } from 'react-router-dom';

// Redux
// import { RootState } from '../../store';
// import { useSelector } from 'react-redux';

// Routes
import { route } from '../../../routes/routes';

// API Connection
import { useGetAuthenticatedUserQuery } from '../users/users-api';

type Props = {
  children: React.JSX.Element;
};

const Redirect = ({ children }: Props) => {
  const location = useLocation();

  const { data } = useGetAuthenticatedUserQuery();

  // const authenticatedUser = useSelector(
  //   (state: RootState) =>
  //     state.users.queries['getAuthenticatedUser(undefined)']?.data
  // );
  // console.log('(Redirect) authenticatedUser:', authenticatedUser);

  if (!data) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return children;
  }

  const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
  sessionStorage.removeItem('redirectAfterLogin');

  return data ? (
    <Navigate to={storedRedirect || route.home} replace />
  ) : (
    children
  );
};

export default Redirect;
