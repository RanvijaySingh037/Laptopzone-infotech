import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './context/ShopContext.jsx'; 

import { HelmetProvider } from 'react-helmet-async';

// Create the root and render the app
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <BrowserRouter>
    <HelmetProvider>
      <ShopContextProvider >
        <App />
      </ShopContextProvider>
    </HelmetProvider>
  </BrowserRouter>
);
