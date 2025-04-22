import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store'; // Your store's root state

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
