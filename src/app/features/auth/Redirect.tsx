// React Router DOM
import { Navigate } from 'react-router-dom';

// Redux
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

// Routes
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Redirect = ({ children }: Props) => {
  const authenticatedUser = useSelector(
    (state: RootState) =>
      state.users.queries['getAuthenticatedUser(undefined)']?.data
  );
  console.log('(Redirect) authenticatedUser:', authenticatedUser);

  return authenticatedUser ? <Navigate to={route.home} replace /> : children;
};

export default Redirect;
