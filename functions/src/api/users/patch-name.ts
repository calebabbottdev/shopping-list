import { Request, Response } from 'express';
import { db } from '../../app';

export const patchName = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { name } = request.body;
  const { id } = request.params;

  try {
    const user = await db.collection('users').doc(id).get();

    if (user.exists) {
      await db.collection('users').doc(id).update({ name });
      response.status(204);
    } else
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve user' });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
