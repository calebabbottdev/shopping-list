// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../../../utility/firebase';

// Layout
import { Button } from '../../../layout/Button';

// Redux
import { useDispatch } from 'react-redux';
import { users } from '../../users/users-api';
import { items } from '../../items/items-api';

const Logout = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);

      dispatch(users.util.resetApiState());
      dispatch(items.util.resetApiState());
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
