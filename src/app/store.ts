import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import { users } from '../features/users/users-api';
import { items } from '../features/items/items-api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [users.reducerPath]: users.reducer,
    [items.reducerPath]: items.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(users.middleware).concat(items.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
