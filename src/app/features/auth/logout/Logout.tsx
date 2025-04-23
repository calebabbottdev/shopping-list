// React
import React from 'react';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../../../../utility/firebase';

// Layout
import Button from '../../../../app/layout/Button';

const Logout = (): React.JSX.Element => {
  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
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
