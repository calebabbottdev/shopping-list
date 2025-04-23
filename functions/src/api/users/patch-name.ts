import { Request, Response } from 'express';
import { db } from '../../app';

export const patchName = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { name } = request.body;
  const { id } = request.params;

  try {
    await db.collection('users').doc(id).set({ name }, { merge: true });

    response.status(204);
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
