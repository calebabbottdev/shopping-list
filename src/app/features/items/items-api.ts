// Redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Connections
import { User } from '../users/users-api';

// Firebase
import { auth } from '../../../utility/firebase';

type Item = {
  id: string;
  addedBy: User;
  name: string;
  quantity: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const items = createApi({
  reducerPath: 'items',
  baseQuery,
  tagTypes: ['items'],
  endpoints: (builder) => ({
    getItems: builder.query<{ items: Item[] }, void>({
      query: () => '/items',
      providesTags: ['items'],
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
      invalidatesTags: ['items'],
    }),
    deleteItem: builder.mutation<Item, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['items'],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
} = items;
