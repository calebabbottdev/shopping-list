import { useEffect, useState } from 'react';

// API Connections
import { useGetItemsQuery } from '../../../../app/features/items/items-api';
import {
  useGetAuthenticatedUserQuery,
  useGetUsersQuery,
} from '../../users/users-api';

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
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export const ItemsList = (): React.JSX.Element => {
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useGetItemsQuery();

  const { data: authenticatedUser } = useGetAuthenticatedUserQuery();
  const { data: users } = useGetUsersQuery();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    if (authenticatedUser?.id) {
      setSelectedUserIds([authenticatedUser.id]);
    }
  }, [authenticatedUser?.id]);

  const handleUserCheckboxChange = (userId: string) => {
    setSelectedUserIds((previous) =>
      previous.includes(userId)
        ? previous.filter((id) => id !== userId)
        : [...previous, userId]
    );
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
    selectedUserIds.length === 0
      ? items?.items
      : items?.items?.filter((item) =>
          selectedUserIds.includes(item.addedBy.id)
        );

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

      <FormControl component='fieldset' sx={{ mb: 2 }}>
        <FormLabel component='legend'>Filter by users</FormLabel>
        <FormGroup>
          {users?.users.map((user) => (
            <FormControlLabel
              key={user.id}
              control={
                <Checkbox
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleUserCheckboxChange(user.id)}
                />
              }
              label={user.id === authenticatedUser?.id ? 'Me' : `${user.name}`}
            />
          ))}
        </FormGroup>
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
                item.addedBy.id === authenticatedUser?.id
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
