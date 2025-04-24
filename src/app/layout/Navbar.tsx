// MUI
import { AppBar, Box, Container, Toolbar } from '@mui/material';

// API Connections
import { useGetAuthenticatedUserQuery } from '../features/users/users-api';

// Components
import Logout from '../features/auth/logout/Logout';

const Navbar = (): React.JSX.Element => {
  const { data, isLoading } = useGetAuthenticatedUserQuery();

  return (
    <>
      <AppBar
        position='static'
        color='inherit'
        sx={{ boxShadow: 'none', justifyContent: 'center' }}
      >
        <Container maxWidth='xl'>
          <Toolbar sx={{ ml: 'auto' }}>
            {data && !isLoading && (
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
