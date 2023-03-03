import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { GlobalProvider } from './context/GlobalContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <LanguageProvider>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            <GlobalProvider>
              <App />
            </GlobalProvider>
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    </LanguageProvider>
  </BrowserRouter>
);


