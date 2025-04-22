// React
import { useState } from 'react';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Layout
import { Button } from './layout/button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        placeholder='Email'
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text='Login' variant='contained' color='primary' type='submit' />
      {error && <p>{error}</p>}
    </form>
  );
};
