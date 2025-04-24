// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../../../utility/firebase';

// Layout
import { Button } from '../../../layout/Button';

// Redux
import { useDispatch } from 'react-redux';

// API Connections
import { users } from '../../users/users-api';
import { items } from '../../items/items-api';

// React Router DOM
import { Navigate, useLocation } from 'react-router-dom';

// Routes
import { route } from '../../../../routes/routes';

const Logout = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async (): Promise<React.JSX.Element | void> => {
    try {
      await signOut(auth);

      dispatch(items.util.resetApiState());
      dispatch(users.util.resetApiState());

      return <Navigate to={route.login} state={{ from: location }} replace />;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button
      text='Logout'
      variant='text'
      color='error'
      onClick={() => handleLogout()}
    />
  );
};

export default Logout;
