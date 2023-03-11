import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { GlobalProvider, LanguageProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';
import UIProvider from './context/UIContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <GoogleOAuthProvider clientId="162877889324-ph6vkb5temebbg62b7sbqrp14t2is97b.apps.googleusercontent.com">
      <GlobalProvider>
        <LanguageProvider>
          <UIProvider>
            <AuthProvider>
              <ProductProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </ProductProvider>
            </AuthProvider>
          </UIProvider>
        </LanguageProvider>
      </GlobalProvider>
    </GoogleOAuthProvider>
  </HashRouter>
);


