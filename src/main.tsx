// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Root
import App from './App.tsx';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// Auth Listener
import { AuthListener } from './components/auth/auth-listener.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthListener />
      <App />
    </Provider>
  </StrictMode>,
);
