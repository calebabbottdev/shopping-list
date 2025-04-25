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
  Alert,
  Box,
  CircularProgress,
  Container,
  // List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';

// React Swipeable
import {
  SwipeableList,
  SwipeableListItem,
  LeadingActions,
  TrailingActions,
  SwipeAction,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

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

      {/* {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
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
        <Box mt={2}>
          <Alert severity='info'>No items were found.</Alert>
        </Box>
      )} */}

      {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
        <SwipeableList>
          {filteredItems.map((item) => (
            <SwipeableListItem
              key={item.id}
              leadingActions={
                <LeadingActions>
                  <SwipeAction onClick={() => console.log('Edit', item.id)}>
                    <Box
                      sx={{
                        bgcolor: blue[500],
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        px: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      Edit
                    </Box>
                  </SwipeAction>
                </LeadingActions>
              }
              trailingActions={
                <TrailingActions>
                  <SwipeAction
                    destructive
                    onClick={() => console.log('Delete', item.id)}
                  >
                    <Box
                      sx={{
                        bgcolor: 'error.main',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        px: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      Delete
                    </Box>
                  </SwipeAction>
                </TrailingActions>
              }
            >
              <ListItem
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
            </SwipeableListItem>
          ))}
        </SwipeableList>
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
