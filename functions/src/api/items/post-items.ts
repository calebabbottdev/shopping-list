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
    response.status(401).json({ error: 'Unauthorized: No user ID found' });
  }

  try {
    const user = (await db.collection('users').doc(userId!).get()).data();

    const item = await db
      .collection('items')
      .add({ item: name, quantity, addedBy: user });

    response.status(201).json({ id: item.id });
  } catch (error) {
    console.error('Error creating trailer:', error);
    response.status(500).json({ error: 'Unable to create trailer' });
  }
};
