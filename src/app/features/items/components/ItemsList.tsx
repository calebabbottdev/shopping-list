import { useState } from 'react';

// API Connections
import { useGetItemsQuery } from '../../../../app/features/items/items-api';

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
  const { data, isLoading, error } = useGetItemsQuery();
  const [selectedUserId, setSelectedUserId] = useState<string>('all');

  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserId(event.target.value);
  };

  const uniqueUserIds = Array.from(
    new Set(data?.items?.map((item) => item.addedBy.id))
  );

  const filteredItems =
    selectedUserId === 'all'
      ? data?.items
      : data?.items?.filter((item) => item.addedBy.id === selectedUserId);

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
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
              User ID: {id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {filteredItems?.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} • User ID: ${item.addedBy.id}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
