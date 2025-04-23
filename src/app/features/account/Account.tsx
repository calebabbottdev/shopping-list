// Components

// API Connections
import { useGetAuthenticatedUserQuery } from '../users/users-api';

const Account = () => {
  const { data, isLoading, error } = useGetAuthenticatedUserQuery();

  return (
    <>
      <p>Account</p>
      {isLoading ? <p>Loading...</p> : data}
      {error && <p>An error occured!</p>}
    </>
  );
};

export default Account;
