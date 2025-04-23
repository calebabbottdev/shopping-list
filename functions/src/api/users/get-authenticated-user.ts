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

export const getAuthenticatedUser = async (
  request: AuthenticatedRequest,
  response: Response
): Promise<void> => {
  const userId = request.user?.uid;

  if (!userId)
    response.status(401).json({ error: 'Unauthorized: userId is missing' });

  try {
    const user = await db.collection('users').doc(userId!).get();

    if (user.exists) response.status(200).json({ id: user.id, ...user.data() });
    else
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve user' });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
