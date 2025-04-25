import { useEffect, useState } from 'react';

// Firebase
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../utility/firebase';

// API
import { useLazyGetAuthenticatedUserQuery } from '../users/users-api';

// MUI
import { Backdrop, CircularProgress } from '@mui/material';

const Auth = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null | undefined>(
    undefined
  );

  const [
    triggerGetAuthenticatedUser,
    { data: authenticatedUser, isLoading, error },
  ] = useLazyGetAuthenticatedUserQuery();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user ?? null);

      if (user) {
        console.log('Logged in as:', user.email);
        triggerGetAuthenticatedUser();
      } else {
        console.log('Logged out');
      }
    });

    return () => unsubscribe();
  }, [triggerGetAuthenticatedUser]);

  if (firebaseUser === undefined || (firebaseUser && isLoading)) {
    return (
      <Backdrop
        open={true}
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  if (firebaseUser && authenticatedUser) {
    console.log('Authenticated User ID:', authenticatedUser.id);
  }

  if (error) {
    console.error('Error fetching user data:', error);
  }

  return null;
};

export default Auth;
