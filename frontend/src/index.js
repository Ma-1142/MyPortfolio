/**
 * INDEX.JS - Purpose: Entry point for React application
 *
 * What this file does:
 * - This is the FIRST JavaScript file that runs when your app loads
 * - Finds the HTML element with id="root" in public/index.html
 * - Renders the React App component inside that element
 * - Sets up React's rendering system
 *
 * Key concepts:
 * - ReactDOM: Bridge between React and the actual HTML DOM
 * - createRoot(): Modern way to render React apps (React 18+)
 * - StrictMode: Development tool that highlights potential problems
 * - render(): Actually displays your React components on the page
 *
 * Flow:
 * 1. Browser loads public/index.html
 * 2. This index.js file runs
 * 3. Finds <div id="root"> in HTML
 * 4. Renders <App /> component inside it
 * 5. Your React app is now visible!
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global CSS styles
import App from './App';  // Main App component
import reportWebVitals from './reportWebVitals';  // Performance monitoring

// Create a "root" - the place where React will render your app
// document.getElementById('root') finds <div id="root"> in public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  // StrictMode: Helps find bugs during development (removed in production)
  <React.StrictMode>
    <App />  {/* Your main App component */}
  </React.StrictMode>
);

// Optional: Measure app performance (loading speed, etc.)
// You can log results or send to analytics
reportWebVitals();
