// Redux
import { configureStore } from '@reduxjs/toolkit';

// API Connections
import { users } from '../app/features/users/users-api';
import { items } from '../app/features/items/items-api';

export const store = configureStore({
  reducer: {
    [users.reducerPath]: users.reducer,
    [items.reducerPath]: items.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(users.middleware).concat(items.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
