import { useState } from 'react';

// API Connections
import { useGetAuthenticatedUserQuery } from '../users/users-api';

// Firebase
import { auth } from '../../../utility/firebase';

// MUI
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

const Account = (): React.JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetAuthenticatedUserQuery();

  const user = auth.currentUser;

  const handleFirebaseAuthOpen = (): void => {
    setDialogOpen(true);
  };

  const handleFirebaseAuthClose = (): void => {
    setDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Typography variant='h4' gutterBottom>
          Account Dashboard
        </Typography>

        {isLoading && (
          <Skeleton variant='rectangular' width='100%' height={200} />
        )}

        {error && <Typography color='error'>An error occurred!</Typography>}

        {data && (
          <Card elevation={3}>
            <CardContent>
              <Grid container spacing={3} alignItems='center'>
                <Grid>
                  <Avatar
                    src={user?.photoURL || ''}
                    alt={user?.displayName || 'User'}
                    sx={{ width: 72, height: 72, fontSize: 32 }}
                    onClick={handleFirebaseAuthOpen}
                  >
                    {data.name?.[0]?.toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid>
                  <Typography variant='h6'>{data.name}</Typography>
                  <Typography color='text.secondary'>{data.email}</Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  User ID
                </Typography>
                <Typography sx={{ wordBreak: 'break-all' }}>
                  {data.id}
                </Typography>

                <Typography
                  variant='subtitle2'
                  color='text.secondary'
                  sx={{ mt: 2 }}
                >
                  Account Created
                </Typography>
                <Typography>
                  {new Date(data.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={handleFirebaseAuthClose}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle>Firebase Auth (Debug)</DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFirebaseAuthClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Account;
