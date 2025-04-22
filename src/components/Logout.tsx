import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/auth-slice';

export const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      if (!auth.currentUser) dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
    >
      Logout
    </button>
  );
};
