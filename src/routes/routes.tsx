// Components & Pages
import Layout from '../app/layout/Layout';
import Protected from '../app/components/auth/Protected';
import Redirect from '../app/components/auth/Redirect';
import Account from '../app/features/account/Account';
import Home from '../app/features/home/Home';
import Login from '../app/features/auth/login/Login';

// React Router
import { createBrowserRouter } from 'react-router-dom';

// Routes
// import Error from '@features/error/Error';
// import Signup from '@features/auth/signup/Signup';

export enum route {
  home = '/',
  account = '/account',

  // Auth
  login = '/login',
  signup = '/signup',
}

export const router = createBrowserRouter([
  {
    path: route.home,
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      {
        path: route.home,
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: route.account,
        element: (
          <Protected>
            <Account />
          </Protected>
        ),
      },
    ],
  },
  {
    path: route.login,
    element: (
      <Redirect>
        <Login />
      </Redirect>
    ),
  },
  {
    path: route.signup,
    element: (
      <Redirect>
        <Home />
      </Redirect>
    ),
  },
]);
