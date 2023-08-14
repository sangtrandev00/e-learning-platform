import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './store/store.ts';

// Create the portal container for notifications
const notificationRoot = document.createElement('div');
notificationRoot.id = 'notification-root';
document.body.appendChild(notificationRoot);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
