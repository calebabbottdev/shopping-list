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

export const postItems = async (
  request: AuthenticatedRequest,
  response: Response
): Promise<void> => {
  const { name, quantity } = request.body;
  const userId = request.user?.uid;

  if (!userId) {
    response.status(401).json({ error: 'Unauthorized: userId is missing' });
    return;
  }

  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      response.status(404).json({ error: 'User not found' });
      return;
    }

    const user = userDoc.data();

    const itemRef = await db
      .collection('items')
      .add({ name, quantity, addedBy: { id: userId, ...user } });

    response.status(201).json({ id: itemRef.id });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
