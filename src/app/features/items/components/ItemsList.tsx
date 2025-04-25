// React
import { useEffect, useState } from 'react';

// API Connections
import {
  useDeleteItemMutation,
  useGetItemsQuery,
} from '../../../../app/features/items/items-api';
import {
  useGetAuthenticatedUserQuery,
  useGetUsersQuery,
} from '../../users/users-api';

// Components
import ItemDialog from './ItemDialog';
import UserFilterCheckboxes from './UserFilterCheckboxes';
import ItemListRow from './ItemListRow';

// MUI
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

export const ItemsList = (): React.JSX.Element => {
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useGetItemsQuery();

  const { data: authenticatedUser } = useGetAuthenticatedUserQuery();
  const { data: users } = useGetUsersQuery();
  const [deleteItem] = useDeleteItemMutation();

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

  const handleEdit = (id: string) => console.log('Edit item:', id);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id).unwrap();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
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

      {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <ItemListRow
            key={item.id}
            item={item}
            isMe={item.addedBy.id === authenticatedUser?.id}
            onClick={handleOpenDialog}
            onEdit={handleEdit} // optional
            onDelete={handleDelete} // optional
          />
        ))
      ) : (
        <Box mt={2}>
          <Alert severity='info'>No items were found.</Alert>
        </Box>
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
