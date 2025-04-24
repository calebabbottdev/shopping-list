import React, { Suspense } from 'react';

// MUI
import { CircularProgress, Box } from '@mui/material';

// Components & Pages
import Layout from '../app/layout/Layout';
import Protected from '../app/features/auth/Protected';
import Redirect from '../app/features/auth/Redirect';
import Account from '../app/features/account/Account';
import Home from '../app/features/home/Home';

// React Router
import { createBrowserRouter } from 'react-router-dom';

const Login = React.lazy(() => import('../app/features/auth/login/Login'));
const Signup = React.lazy(() => import('../app/features/auth/signup/Signup'));

const loader = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <CircularProgress />
    </Box>
  );
};

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
            <Suspense fallback={loader()}>
              <Home />
            </Suspense>
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
        <Suspense fallback={loader()}>
          <Login />
        </Suspense>
      </Redirect>
    ),
  },
  {
    path: route.signup,
    element: (
      <Redirect>
        <Suspense fallback={loader()}>
          <Signup />
        </Suspense>
      </Redirect>
    ),
  },
]);
