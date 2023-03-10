import React from 'react';
import { useLanguage } from '../context/GlobalContext';
import { MyRouter } from '../router/MyRouter';
import { Navbar, Cart, Login, Search } from './index';
import { ALL_LINK, CITY_LINK, EBIKE_LINK, MTB_LINK, ROAD_LINK } from '../router/paths';

const Layout = () => {

  const { text } = useLanguage();



  const items = [
    {
      ref: ALL_LINK,
      text: text.header.promo
    },
    {
      ref: ROAD_LINK,
      text: text.header.road
    },
    {
      ref: MTB_LINK,
      text: text.header.mtb
    },
    {
      ref: EBIKE_LINK,
      text: text.header.ebike
    },
    {
      ref: CITY_LINK,
      text: text.header.city
    }
  ];

  return (
    <div className='layout'>
      <Navbar items={items} />
      <Login />
      <Search />
      <Cart />
      <MyRouter />
    </div>
  )
}

export default Layout;