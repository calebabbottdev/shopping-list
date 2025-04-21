import * as functionsV1 from 'firebase-functions/v1';
import { db } from '../../app';

export const createUser = functionsV1.auth.user().onCreate(async (user) => {
  const { uid, email, metadata } = user;

  try {
    await db.collection('users').doc(uid).set({
      id: uid,
      email,
      createdAt: metadata.creationTime,
    });
  } catch (error) {
    console.error('Error creating user record:', error);
  }
});
