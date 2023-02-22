import { Route, Routes } from "react-router-dom";
import Page404 from "../components/Page404";
import Home from "../components/Home/Home";
import Category from "../components/Categories/Category";
import React from 'react'


export const MyRouter = () => {

  return (
    <Routes>
      <Route index element={<Home />} ></Route>
      <Route path="product-category/bycicles">
        <Route path=":type" element={<Category />}></Route>
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
};