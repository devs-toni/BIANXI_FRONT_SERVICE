import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { GlobalProvider, LanguageProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';
import UIProvider from './context/UIContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="162877889324-ph6vkb5temebbg62b7sbqrp14t2is97b.apps.googleusercontent.com">
      <LanguageProvider>
        <UIProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <GlobalProvider>
                  <App />
                </GlobalProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </UIProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>,
  </BrowserRouter>
);


