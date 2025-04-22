import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  id: string;
  email: string;
  createdAt: string;
};

export const users = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ users: User[] }, void>({
      query: () => '/users',
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = users;
