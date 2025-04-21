import { Request, Response } from 'express';
import { db } from '../../app';

export const getItem = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { id } = request.params;
    const item = await db.collection('items').doc(id).get();

    if (item.exists) {
      response.status(200).json({ id: item.id, ...item.data() });
    } else {
      response.status(404).json({ error: 'Item not found!' });
    }
  } catch (error) {
    response.status(500).json({ error: 'An error occured!' });
  }
};
