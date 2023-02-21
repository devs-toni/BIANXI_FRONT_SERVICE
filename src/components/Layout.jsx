import React, { useContext, useEffect } from 'react'
import Footer from './Footer/Footer';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from './Header/Navbar';
import { MyRouter } from '../router/MyRouter';
import CartContext from '../context/CartContext';

const items = JSON.parse(localStorage.getItem('cart'));

const Layout = () => {

  const { setTotalProducts } = useContext(CartContext);

  useEffect(() => {
    items ? setTotalProducts(items) : setTotalProducts([]);
    
  }, [setTotalProducts]);

  return (
    <>
      <LanguageProvider>
        <Navbar />
        <MyRouter />
        <Footer />
      </LanguageProvider>
    </>
  )
}

export default Layout;