import { onRequest } from 'firebase-functions/v2/https';
import { app } from './app';

// Auth
import { authenticate } from './middleware/authentication';

// Users
import { createUser } from './api/users/create-user';
import { getAuthenticatedUser } from './api/users/get-authenticated-user';
import { getUsers } from './api/users/get-users';
import { getUser } from './api/users/get-user';
import { putUser } from './api/users/put-user';
import { deleteUser } from './api/users/delete-user';

// Items
import { getItems } from './api/items/get-items';
import { getItem } from './api/items/get-item';
import { postItems } from './api/items/post-items';
import { deleteItem } from './api/items/delete-item';

app.get('/users/authenticated-user', authenticate, getAuthenticatedUser);
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.put('/users', putUser);

// Items
app.post('/items', authenticate, postItems);
app.get('/items', getItems);
app.get('/items/:id', getItem);
app.delete('/items/:id', authenticate, deleteItem);

exports.api = onRequest(app);

exports.createUserRecord = createUser;
exports.deleteUserRecord = deleteUser;
