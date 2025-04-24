import { Request, Response } from 'express';
import { db } from '../../app';

export const getUsers = async (
  _request: Request,
  response: Response
): Promise<void> => {
  try {
    const snapshot = await db.collection('users').get();

    if (snapshot.empty) {
      response.status(200).json({ users: [] });
      return;
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    response.status(200).json({ users });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
