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

type UserData = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container id='login-container' maxWidth='sm'>
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
            fullWidth
          />
        </Grid>
      </Grid>
      {error !== null && <Box id='error'>{error}</Box>}
    </Container>
  );
};

export default Login;
