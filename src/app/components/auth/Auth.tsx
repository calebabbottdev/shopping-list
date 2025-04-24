// React
import React, { useEffect } from 'react';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../utility/firebase';

// API Connections
import { useLazyGetAuthenticatedUserQuery } from '../../features/users/users-api';

const Auth: React.FC = (): null => {
  const [fetchUser] = useLazyGetAuthenticatedUserQuery();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await fetchUser();
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });

    return () => unsubscribe();
  }, [fetchUser]);

  return null;
};

export default Auth;
