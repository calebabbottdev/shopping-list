import { useEffect, useState } from 'react';

// API Connections
import { useGetItemsQuery } from '../../../../app/features/items/items-api';
import { useGetUsersQuery, User } from '../../users/users-api';

// Redux
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

// Components
import ItemDialog from './ItemDialog';

// MUI
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export const ItemsList = (): React.JSX.Element => {
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useGetItemsQuery();

  const authenticatedUser = useSelector(
    (state: RootState) =>
      state.users.queries['getAuthenticatedUser(undefined)']?.data
  ) as User;

  const { data: users } = useGetUsersQuery();

  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (authenticatedUser.id && selectedUserId === 'all') {
      setSelectedUserId(authenticatedUser.id);
    }
  }, [authenticatedUser.id]);

  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserId(event.target.value);
  };

  const handleOpenDialog = (itemId: string): void => {
    setSelectedItemId(itemId);
    setDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpen(false);
    setSelectedItemId(null);
  };

  const filteredItems =
    selectedUserId === 'all'
      ? items?.items
      : items?.items?.filter((item) => item.addedBy.id === selectedUserId);

  if (isItemsLoading)
    return (
      <Box display='flex' justifyContent='center' mt={4}>
        <CircularProgress />
      </Box>
    );

  if (itemsError)
    return (
      <Container maxWidth='sm'>
        <Alert severity='error'>Error loading items</Alert>
      </Container>
    );

  return (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Typography variant='h5' gutterBottom>
        Items
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id='user-filter-label'>Filter by user</InputLabel>
        <Select
          labelId='user-filter-label'
          id='user-filter'
          value={selectedUserId}
          label='Filter by user'
          onChange={handleUserChange}
        >
          <MenuItem value='all'>All users</MenuItem>
          {users?.users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.id === authenticatedUser.id ? 'Me' : `${user.name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {filteredItems?.map((item) => (
          <ListItem
            key={item.id}
            divider
            component='button'
            onClick={() => handleOpenDialog(item.id)}
          >
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} • ${
                item.addedBy.id === authenticatedUser.id
                  ? 'Me'
                  : `${item.addedBy.name}`
              }`}
            />
          </ListItem>
        ))}
      </List>

      {selectedItemId && (
        <ItemDialog
          id={selectedItemId}
          open={dialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </Container>
  );
};
