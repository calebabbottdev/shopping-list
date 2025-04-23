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

  if (!userId) {
    response.status(401).json({ error: 'Unauthorized: No user ID found' });
    return;
  }

  try {
    const itemRef = db.collection('items').doc(id);
    const itemSnapshot = await itemRef.get();

    if (!itemSnapshot.exists) {
      response.status(404).json({ error: 'Item not found!' });
      return;
    }

    const itemData = itemSnapshot.data();

    if (itemData?.addedBy?.id !== userId) {
      response
        .status(403)
        .json({ error: 'Forbidden: You do not own this item' });
      return;
    }

    await itemRef.delete();
    response.status(200).json({ message: 'Item successfully deleted!' });
  } catch (error) {
    console.error('Error deleting item:', error);
    response.status(500).json({ error: 'An error occurred!' });
  }
};
