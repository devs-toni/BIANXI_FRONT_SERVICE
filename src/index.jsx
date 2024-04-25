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
import { GOOGLE_OAUTH_KEY } from './config/configuration';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_OAUTH_KEY}>
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
    </QueryClientProvider>
  </HashRouter>
);


