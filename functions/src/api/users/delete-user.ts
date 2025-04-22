import * as functionsV1 from 'firebase-functions/v1';
import { db } from '../../app';

const deleteUser = functionsV1.auth.user().onDelete(async (user) => {
  const { uid } = user;

  try {
    await db.collection('users').doc(uid).delete();
    const items = await db.collection('items').get();

    for (const item of items.docs) {
      if (item.data().addedBy.id === uid)
        await db.collection('items').doc(item.id).delete();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
});

export { deleteUser };
