import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { AppWrapper } from './context/AppWrapper'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWrapper>  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppWrapper>
);
