// Redux
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Firebase
import { auth } from '../../../utility/firebase';

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const users = createApi({
  reducerPath: 'users',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<{ users: User[] }, void>({
      query: () => '/users',
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
    getAuthenticatedUser: builder.query<User, void>({
      query: () => `/users/authenticated-user`,
    }),
    updateUserName: builder.mutation<User, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/users/${id}/name`,
        method: 'PATCH',
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetAuthenticatedUserQuery,
  useLazyGetAuthenticatedUserQuery,
  useUpdateUserNameMutation,
} = users;
