import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
admin.initializeApp();

export const app = express();

app.use(
  cors({
    origin: 'https://cha-shopping-list.web.app',
  }),
);

export const db = admin.firestore();
