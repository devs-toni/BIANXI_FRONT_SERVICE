import React from 'react';
import { useLanguage } from '../context/GlobalContext';
import { useUser } from '../context/UserContext';
import { MyRouter } from '../router/MyRouter';
import { Navbar, Cart, Login, Search } from './index';

const Layout = () => {

  const { text } = useLanguage();

  const { handleUser } = useUser();
  const { state: user_state } = handleUser();

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
    <div className='layout'>
      <Navbar items={items} />
      <Login isLogged={user_state.isLogged} />
      <Search />
      <Cart />
      <MyRouter />
    </div>
  )
}

export default Layout;