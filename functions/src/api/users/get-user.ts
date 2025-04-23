import { Request, Response } from 'express';
import { db } from '../../app';

export const getUser = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;

  try {
    const user = await db.collection('users').doc(id).get();

    if (user.exists) response.status(200).json({ id: user.id, ...user.data() });
    else
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve user' });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
