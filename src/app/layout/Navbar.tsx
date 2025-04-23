import * as React from 'react';

// MUI
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Routes
import { route } from '../../routes/routes';

// Redux
import { useSelector } from 'react-redux';

// App Store
import { RootState } from '../../app/store';

// Components
import { Logout } from '../../components/Logout';

const Navbar = (): React.JSX.Element => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <>
      <AppBar
        position='static'
        color='inherit'
        sx={{ height: '75px', boxShadow: 'none', justifyContent: 'center' }}
      >
        <Container maxWidth='xl'>
          <Toolbar>
            {isAuthenticated ? (
              <>
                <p>Welcome, {user?.name || 'Guest'}!</p>
                <Button
                  color='inherit'
                  component={Link}
                  to={route.home}
                  sx={{ mr: 'auto' }}
                >
                  Home
                </Button>
                <Logout />
              </>
            ) : (
              <>
                <Button color='inherit' component={Link} to={route.login}>
                  Login
                </Button>
                <Button color='inherit' component={Link} to={route.signup}>
                  Signup
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box id='outlet-container' children={<Outlet />} />
    </>
  );
};

export default Navbar;
