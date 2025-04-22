import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Logged in as:', user.email);
  } else {
    console.log('Logged out');
  }
});
