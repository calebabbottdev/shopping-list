import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../users/users-api';
import { auth } from '../../firebase/firebase';

type Item = {
  id: string;
  addedBy: User;
  item: string;
  quantity: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      headers.set('authorization', `Bearer ${token}`);
      console.log(token);
    }

    return headers;
  },
});

export const items = createApi({
  reducerPath: 'items',
  baseQuery,
  endpoints: (builder) => ({
    getItems: builder.query<{ items: Item[] }, void>({
      query: () => '/items',
    }),
    getItemById: builder.query<Item, string>({
      query: (id) => `/items/${id}`,
    }),
    createItem: builder.mutation<Item, Partial<Item>>({
      query: (item) => ({
        url: '/items',
        method: 'POST',
        body: item,
      }),
    }),
  }),
});

export const { useGetItemsQuery, useGetItemByIdQuery, useCreateItemMutation } =
  items;
