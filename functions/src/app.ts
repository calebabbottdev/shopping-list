import express from 'express';
import admin from 'firebase-admin';

admin.initializeApp();

export const app = express();
export const db = admin.firestore();
