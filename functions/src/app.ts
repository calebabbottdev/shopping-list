import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const app = express();
const db = admin.firestore();

app.use(
  cors({
    origin: 'https://cha-shopping-list.web.app',
    credentials: true,
  }),
);

app.use(express.json());
app.options('*', cors());

export { app, db };
