import React from 'react'
import Footer from './Footer/Footer';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from './Header/Navbar';
import { MyRouter } from '../router/MyRouter';
import { CartProvider } from '../context/CartContext';

const Layout = () => {

  return (
    <>
      <LanguageProvider>
        <CartProvider>
          <Navbar />
          <MyRouter />
          <Footer />
        </CartProvider>
      </LanguageProvider>
    </>
  )
}

export default Layout;