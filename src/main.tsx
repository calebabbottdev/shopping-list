import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthListener } from './components/auth/auth-listener.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthListener />
      <App />
    </Provider>
  </StrictMode>,
);
