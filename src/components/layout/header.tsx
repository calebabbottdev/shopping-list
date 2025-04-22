// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// App Store
import { RootState } from '../../app/store';

export const Header: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name || 'Guest'}!</p>
        </div>
      ) : (
        <div>
          <p>Please log in</p>
        </div>
      )}
    </header>
  );
};
