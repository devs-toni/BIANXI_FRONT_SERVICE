import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { GlobalProvider, LanguageProvider } from './context/GlobalContext';
import { UserProvider } from './context/UserContext';
import UIProvider from './context/UIContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <LanguageProvider>
      <UIProvider>
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <GlobalProvider>
                <App />
              </GlobalProvider>
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </UIProvider>
    </LanguageProvider>
  </BrowserRouter>
);


