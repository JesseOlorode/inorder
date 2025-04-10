
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get root element with safeguard
const rootElement = document.getElementById("root");

// Create a function to handle the rendering
const renderApp = (container: HTMLElement) => {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering application:", error);
    // Create an error message in the DOM if rendering fails
    container.innerHTML = `
      <div style="color: red; padding: 20px; text-align: center;">
        <h1>Application Error</h1>
        <p>There was an error loading the application. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="padding: 10px; margin-top: 20px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
};

if (!rootElement) {
  console.error("Failed to find root element! Creating fallback element.");
  // Create a fallback element if root is not found
  const fallbackElement = document.createElement("div");
  fallbackElement.id = "root";
  document.body.appendChild(fallbackElement);
  renderApp(fallbackElement);
} else {
  renderApp(rootElement);
}
