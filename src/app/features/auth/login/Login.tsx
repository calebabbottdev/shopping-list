import { useState } from 'react';

// MUI
import { Box, Container, Grid, TextField, Typography } from '@mui/material';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../utility/firebase';

// Layout
import { Button } from '../../../layout/Button';

// React Hook Form
import { useForm } from 'react-hook-form';
import { route } from '../../../../routes/routes';

// API Connections
import { useLazyGetAuthenticatedUserQuery } from '../../users/users-api';

type UserData = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  const [fetchUser, { isLoading }] = useLazyGetAuthenticatedUserQuery();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await user.getIdToken();
        await fetchUser();
        console.log(user);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container id='login-container' maxWidth='sm' sx={{ mt: 5 }}>
      <Grid
        container
        spacing={3}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid size={12}>
          <Typography variant='h2' align='center'>
            Login
          </Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            id='email-address-input'
            label='Email'
            variant='outlined'
            fullWidth
            {...register('email', { required: true })}
            error={errors.email?.type === 'required'}
            helperText={
              errors.email?.type === 'required' && 'Email is required'
            }
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id='password-input'
            label='Password'
            variant='outlined'
            fullWidth
            {...register('password', { required: true })}
            error={errors.password?.type === 'required'}
            helperText={
              errors.password?.type === 'required' && 'Password is required'
            }
          />
        </Grid>
        <Grid size={12}>
          <Button
            id='login-button'
            text='Login'
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
            fullWidth
          />
        </Grid>
      </Grid>
      {error !== null && <Box id='error'>{error}</Box>}
      <Typography variant='body2' align='center' sx={{ mt: 2 }}>
        Don&apos;t have an account?{' '}
        <a
          href={route.signup}
          style={{ color: '#1976d2', textDecoration: 'none' }}
        >
          Sign up here
        </a>
      </Typography>
    </Container>
  );
};

export default Login;
