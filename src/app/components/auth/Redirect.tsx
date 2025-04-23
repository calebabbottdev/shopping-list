import * as React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

// React Router DOM
import { Navigate } from 'react-router-dom';

// Routes
import { route } from '../../../routes/routes';

type Props = {
  children: React.JSX.Element;
};

const Redirect = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <Navigate to={route.home} replace /> : children;
};

export default Redirect;
