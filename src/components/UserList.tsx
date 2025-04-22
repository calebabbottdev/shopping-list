import { useGetUsersQuery } from '../features/users/users-api';

export const UserList = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <ul>
      {data?.users?.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
};
