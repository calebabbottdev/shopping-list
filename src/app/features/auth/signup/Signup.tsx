import { useState } from 'react';

// MUI
import { Box, Container, Grid, TextField, Typography } from '@mui/material';

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../utility/firebase';

// Layout
import { Button } from '../../../layout/Button';

// React Hook Form
import { useForm } from 'react-hook-form';

// API Connections
import { useUpdateUserNameMutation } from '../../users/users-api';
import { route } from '../../../../routes/routes';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [updateUserName, { isLoading }] = useUpdateUserNameMutation();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpData>();

  const onSubmit = async (data: SignUpData) => {
    const { name, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await updateUserName({ id: uid, name });

      setError(null);
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message);
    }
  };

  return (
    <Container id='signup-container' maxWidth='sm' sx={{ mt: 5 }}>
      <Grid
        container
        spacing={3}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid size={12}>
          <Typography variant='h2' align='center'>
            Signup
          </Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            id='name-input'
            label='Name'
            variant='outlined'
            fullWidth
            {...register('name', { required: true })}
            error={errors.name?.type === 'required'}
            helperText={errors.name?.type === 'required' && 'Name is required'}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id='email-input'
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
            type='password'
            {...register('password', { required: true })}
            error={errors.password?.type === 'required'}
            helperText={
              errors.password?.type === 'required' && 'Password is required'
            }
          />
        </Grid>
        <Grid size={12}>
          <Button
            id='signup-button'
            text='Sign Up'
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
            fullWidth
          />
        </Grid>
      </Grid>
      {error && (
        <Box id='error' mt={2}>
          <Typography color='error'>{error}</Typography>
        </Box>
      )}

      <Typography variant='body2' align='center' sx={{ mt: 2 }}>
        Already have an account?{' '}
        <a
          href={route.login}
          style={{ color: '#1976d2', textDecoration: 'none' }}
        >
          Login here
        </a>
      </Typography>
    </Container>
  );
};

export default Signup;
