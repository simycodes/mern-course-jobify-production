import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css' // normalize.css is always put above the index.css file
import './index.css';
import App from './App';

import { AppProvider } from './context/appContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* AppProvider PROVIDES ACCESS TO CERTAIN STATE VARIABLES AND METHODS TO ALL APP
    COMPONENT WITHOUT HAVE TO DO PROP DRILLING WHEN ACCESS THESE IN SUB COMPONENTS */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
