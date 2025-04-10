
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure React is properly initialized
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find root element!");
  // Create a fallback element if root is not found
  const fallbackElement = document.createElement("div");
  fallbackElement.id = "root";
  document.body.appendChild(fallbackElement);
  
  createRoot(fallbackElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
