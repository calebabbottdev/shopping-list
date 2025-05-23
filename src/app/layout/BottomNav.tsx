import { JSX, useState } from 'react';

// Components
import AddItem from '../features/items/components/AddItem';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// MUI
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab,
} from '@mui/material';
import {
  Home as HomeIcon,
  AccountCircle as AccountIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Routes
import { route } from '../../routes/routes';

const BottomNav = (): JSX.Element => {
  const [value, setValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (newValue: number): void => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate(route.home);
        break;
      case 1:
        navigate(route.account);
        break;
    }
  };

  const handleFabClick = (): void => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => handleNavigation(newValue)}
        >
          <BottomNavigationAction label='Home' icon={<HomeIcon />} />
          <BottomNavigationAction label='Account' icon={<AccountIcon />} />
        </BottomNavigation>
      </Paper>

      <Fab
        color='primary'
        aria-label='add'
        onClick={handleFabClick}
        sx={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100,
        }}
      >
        <AddIcon />
      </Fab>

      <AddItem open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default BottomNav;
