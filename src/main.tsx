import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Notification from './components/Notification/index.tsx';

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
