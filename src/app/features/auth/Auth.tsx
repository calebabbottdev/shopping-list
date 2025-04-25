import { useEffect, useState } from 'react';

// Firebase
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../utility/firebase';

// API
import { useLazyGetAuthenticatedUserQuery } from '../users/users-api';

// MUI
import { CircularProgress, Box } from '@mui/material';

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
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
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
