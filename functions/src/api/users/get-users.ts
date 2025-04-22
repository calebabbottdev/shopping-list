import { Request, Response } from 'express';
import { db } from '../../app';

export const getUsers = async (
  _request: Request,
  response: Response,
): Promise<void> => {
  try {
    response.set(
      'Access-Control-Allow-Origin',
      'https://cha-shopping-list.web.app',
    );

    const userDocsSnapshot = await db.collection('users').get();

    const users = userDocsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    response.status(200).json({ users });
  } catch (error) {
    response.status(500).json({ error: 'Error fetching users' });
  }
};
