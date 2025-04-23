import { useEffect, useState } from 'react';

// API Connections
import { useGetItemsQuery } from '../../../../app/features/items/items-api';
import { useGetAuthenticatedUserQuery } from '../../users/users-api';

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
import ItemDialog from './ItemDialog';

export const ItemsList = (): React.JSX.Element => {
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useGetItemsQuery();
  const { data: user, isSuccess: userLoaded } = useGetAuthenticatedUserQuery();

  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (userLoaded && user?.id && selectedUserId === 'all') {
      setSelectedUserId(user.id);
    }
  }, [userLoaded, user?.id]);

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

  const uniqueUserIds = Array.from(
    new Set(items?.items?.map((item) => item.addedBy.id))
  );

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
          {uniqueUserIds.map((id) => (
            <MenuItem key={id} value={id}>
              {id === user?.id ? 'Me' : `User ID: ${id}`}
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
                item.addedBy.id === user?.id
                  ? 'Me'
                  : `User ID: ${item.addedBy.id}`
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
