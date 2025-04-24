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

export const putUser = async (
  request: AuthenticatedRequest,
  response: Response
): Promise<void> => {
  const { name } = request.body;
  const userId = request.user?.uid;

  if (!userId) {
    response.status(401).json({ error: 'Unauthorized: userId is missing' });
    return;
  }

  try {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve user' });
      return;
    }

    await userRef.update({ name });
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
