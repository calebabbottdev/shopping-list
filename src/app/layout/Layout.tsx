// Components
import BottomNav from './BottomNav';
import Navbar from './Navbar';

// React Router DOM
import { Outlet } from 'react-router-dom';

// MUI
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ pb: 10 }}>
        {' '}
        <Outlet />
      </Box>
      <BottomNav />
    </>
  );
};

export default Layout;
