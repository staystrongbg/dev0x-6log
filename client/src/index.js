import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './authContext';
import { PostContextProvider } from './postContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PostContextProvider>
  </React.StrictMode>
);
