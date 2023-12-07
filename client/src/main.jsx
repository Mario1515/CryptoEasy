import React from 'react'
import { createRoot } from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);