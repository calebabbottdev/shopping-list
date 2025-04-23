// Components & Pages
import Navbar from '../app/layout/Navbar';

// React Router
import { createBrowserRouter } from 'react-router-dom';

// Routes
// import Error from '@features/error/Error';
import Home from '../app/features/home/Home';
// import Login from '@features/auth/login/Login';
// import Signup from '@features/auth/signup/Signup';

export enum route {
  home = '/',

  // Auth
  login = '/login',
  signup = '/signup',
}

export const router = createBrowserRouter([
  {
    path: route.home,
    element: <Navbar />,
    // errorElement: <Error />,
    children: [
      {
        path: route.home,
        element: <Home />,
      },
      {
        path: route.login,
        // element: <Login />,
      },
      {
        path: route.login,
        // element: <Signup />,
      },
    ],
  },
]);
