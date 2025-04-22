// React
import React from 'react';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Layout
import { Button } from './layout/button';

export const Logout: React.FC = () => {
  const handleLogout = async () => {
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
