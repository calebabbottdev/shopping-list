import { Request, Response } from 'express';
import { db } from '../../app';

export const getUser = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;

  if (!id) {
    response.status(400).json({ error: 'Bad Request: userId is missing' });
    return;
  }

  try {
    const userDoc = await db.collection('users').doc(id).get();

    if (!userDoc.exists) {
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve user' });
      return;
    }

    response.status(200).json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
