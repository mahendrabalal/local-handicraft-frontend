import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './config.js'

// Handle environment-specific logic
if (import.meta.env.MODE === 'development') {
  console.log('Running in development mode');
  // Development-specific code
} else {
  console.log('Running in production mode');
  // Production-specific code
}
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
