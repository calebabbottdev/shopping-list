// API Connections
import { useGetAuthenticatedUserQuery } from '../users/users-api';

const Account = () => {
  const { data, isLoading, error } = useGetAuthenticatedUserQuery();

  return (
    <>
      <p>Account</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>An error occurred!</p>}
      {data && (
        <div>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Created At: {data.createdAt}</p>
        </div>
      )}
    </>
  );
};

export default Account;
