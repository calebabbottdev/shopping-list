import { ItemsList } from './components/ItemsList';
import { NewItemForm } from './components/NewItemForm';
import { UserList } from './components/UserList';
import { LoginForm } from './components/Login';

import './app/auth-listener';

function App() {
  return (
    <>
      <LoginForm />
      <UserList />
      <ItemsList />
      <NewItemForm />
    </>
  );
}

export default App;
