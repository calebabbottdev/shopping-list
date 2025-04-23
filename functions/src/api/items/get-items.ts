import { Request, Response } from 'express';
import { db } from '../../app';

export const getItems = async (
  _request: Request,
  response: Response
): Promise<void> => {
  try {
    const itemsSnapshot = await db.collection('items').get();

    const items = itemsSnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    response.status(200).json({ items });
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
