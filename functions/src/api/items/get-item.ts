import { Request, Response } from 'express';
import { db } from '../../app';

export const getItem = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { id } = request.params;

    const itemSnapshot = await db.collection('items').doc(id).get();

    if (itemSnapshot.exists) {
      response
        .status(200)
        .json({ id: itemSnapshot.id, ...itemSnapshot.data() });
      return;
    } else {
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve item' });
      return;
    }
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
