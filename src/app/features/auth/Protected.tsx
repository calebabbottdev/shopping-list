// React Router DOM
import { Navigate, useLocation } from 'react-router-dom';
import { route } from '../../../routes/routes';

// Redux
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

type Props = {
  children: React.JSX.Element;
};

const Protected = ({ children }: Props): React.JSX.Element => {
  const location = useLocation();

  const authenticatedUser = useSelector(
    (state: RootState) =>
      state.users.queries['getAuthenticatedUser(undefined)']?.data
  );
  console.log('(Protected) authenticatedUser:', authenticatedUser);

  if (!authenticatedUser) {
    return <Navigate to={route.login} state={{ from: location }} replace />;
  }

  return children;
};

export default Protected;
