import { useEffect, useState } from 'react';

// API Connections
import { useGetItemsQuery } from '../../../../app/features/items/items-api';
import {
  useGetAuthenticatedUserQuery,
  useGetUsersQuery,
} from '../../users/users-api';

// Components
import ItemDialog from './ItemDialog';
import UserFilterCheckboxes from './UserFilterCheckboxes';

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
        <Alert severity='error'>
          There was an error loading items. Please text Caleb.
        </Alert>
      </Container>
    );

  return (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Typography variant='h5' gutterBottom>
        Items
      </Typography>

      {users?.users && (
        <UserFilterCheckboxes
          users={users.users}
          authenticatedUserId={authenticatedUser?.id}
          selectedUserIds={selectedUserIds}
          onChange={handleUserCheckboxChange}
        />
      )}

      {filteredItems && filteredItems.length > 0 ? (
        <List>
          {filteredItems.map((item) => (
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
                    : item.addedBy.name
                }`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          <Typography variant='body2' color='text.secondary'>
            No items found.
          </Typography>
          <Alert severity='info'>No items found.</Alert>
        </>
      )}

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
