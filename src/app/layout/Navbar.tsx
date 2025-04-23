// MUI
import { AppBar, Box, Container, Toolbar } from '@mui/material';

// Redux
import { useSelector } from 'react-redux';

// App Store
import { RootState } from '../../app/store';

// Components
import Logout from '../features/auth/logout/Logout';

const Navbar = (): React.JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <AppBar
        position='static'
        color='inherit'
        sx={{ boxShadow: 'none', justifyContent: 'center' }}
      >
        <Container maxWidth='xl'>
          <Toolbar sx={{ ml: 'auto' }}>
            {isAuthenticated && (
              <Box ml='auto'>
                <Logout />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
