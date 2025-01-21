import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminProvider } from './context/AdminContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);