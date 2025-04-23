// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// MUI Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// Auth Listener
import Auth from './app/components/auth/Auth';

// React Router
import { RouterProvider } from 'react-router-dom';

// Routes
import { router } from './routes/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Auth />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
