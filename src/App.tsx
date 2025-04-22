import { ItemsList } from './components/ItemsList';
import { NewItemForm } from './components/NewItemForm';
import { UserList } from './components/UserList';
import { LoginForm } from './components/Login';
import { Logout } from './components/Logout';
import { Header } from './components/layout/header';

function App() {
  return (
    <>
      <Header />
      <LoginForm />
      <UserList />
      <ItemsList />
      <NewItemForm />
      <Logout />
    </>
  );
}

export default App;
