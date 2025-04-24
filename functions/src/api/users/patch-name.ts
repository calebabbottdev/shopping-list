import { Request, Response } from 'express';
import { db } from '../../app';

export const patchName = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { name } = request.body;
  const { id } = request.params;

  try {
    const userRef = db.collection('users').doc(id);
    const user = await userRef.get();

    if (user.exists) {
      await userRef.update({ name });
      response.status(204).end();
    } else {
      await userRef.set({ name }, { mergeFields: ['name'] });
      response.status(201).json({ id });
    }
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
