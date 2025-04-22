import { Request, Response } from 'express';
import { db } from '../../app';

export const getUsers = async (
  _request: Request,
  response: Response,
): Promise<void> => {
  try {
    const userDocsSnapshot = await db.collection('users').get();

    const users = userDocsSnapshot.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }));

    response.status(200).json({ users });
  } catch (error) {
    response.status(500).json({ error: 'Error fetching users' });
  }
};
