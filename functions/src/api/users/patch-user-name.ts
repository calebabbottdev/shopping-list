import { Request, Response } from 'express';
import { db } from '../../app';

export const patchUserName = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { name } = request.body;
  const { id } = request.params;

  try {
    await db.collection('users').doc(id).update({ name });
    response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Unable to update user' });
  }
};
