import { Request, Response } from 'express';
import { db } from '../../app';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    [key: string]: any;
  };
  body: {
    name: string;
    quantity: number;
  };
}

export const patchUserName = async (
  request: AuthenticatedRequest,
  response: Response
): Promise<void> => {
  const { name } = request.body;
  const userId = request.user?.uid;

  if (!userId) {
    response.status(401).json({ error: 'Unauthorized: No user ID found' });
  }

  try {
    await db.collection('users').doc(userId!).update({ name });

    response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Unable to update user' });
  }
};
