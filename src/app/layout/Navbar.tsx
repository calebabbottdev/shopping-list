// MUI
import { AppBar, Box, Container, Toolbar } from '@mui/material';

// Components
import Logout from '../features/auth/logout/Logout';

const Navbar = (): React.JSX.Element => {
  return (
    <>
      <AppBar
        position='static'
        color='inherit'
        sx={{ boxShadow: 'none', justifyContent: 'center' }}
      >
        <Container maxWidth='xl'>
          <Toolbar sx={{ ml: 'auto' }}>
            <Box ml='auto'>
              <Logout />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
