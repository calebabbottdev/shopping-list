// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { login, logout, setUser } from '../../features/auth/auth-slice';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../utility/firebase';

export const AuthListener: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({ email: user.email || '', name: user.displayName || '' }),
        );
        dispatch(login());
      } else {
        dispatch(setUser(null));
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};
