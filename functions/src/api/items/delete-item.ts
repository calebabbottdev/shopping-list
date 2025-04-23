import { Request, Response } from 'express';
import { db } from '../../app';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    [key: string]: any;
  };
}

export const deleteItem = async (
  request: AuthenticatedRequest,
  response: Response
): Promise<void> => {
  const { id } = request.params;
  const userId = request.user?.uid;

  if (!userId)
    response.status(401).json({ error: 'Unauthorized: userId is missing' });

  try {
    const itemReference = db.collection('items').doc(id);
    const itemSnapshot = await db.collection('items').doc(id).get();

    if (!itemSnapshot.exists)
      response
        .status(404)
        .json({ error: 'Not Found: Could not retrieve item' });

    const itemData = itemSnapshot.data();

    if (itemData?.addedBy?.id !== userId)
      response
        .status(403)
        .json({ error: 'Forbidden: Items can only be deleted by the creater' });

    await itemReference.delete();

    response.status(204);
  } catch (error) {
    response.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};
