import React, { useContext } from 'react'
import {Navbar, Footer, Cart} from './index';
import LanguageContext from '../context/LanguageContext';
import { MyRouter } from '../router/MyRouter';

const Layout = () => {

  const { text } = useContext(LanguageContext);

  const items = [
    {
      ref: "product-category/bycicles/road",
      text: text.header.road
    },
    {
      ref: "product-category/bycicles/mtb",
      text: text.header.mtb
    },
    {
      ref: "product-category/bycicles/ebike",
      text: text.header.ebike
    },
    {
      ref: "product-category/bycicles/city",
      text: text.header.city
    }
  ];

  return (
    <>
      <Navbar items={items} />
      <Cart />
      <MyRouter />
      <Footer />
    </>
  )
}

export default Layout;