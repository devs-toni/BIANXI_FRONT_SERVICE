import { Route, Routes } from "react-router-dom";
import Page404 from "../components/Page404";
import Home from "../components/Home/Home";
import Category from "../components/Categories/Category";
import React from 'react'
import ProductView from "../components/ProductView/ProductView";


export const MyRouter = () => {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="product-category/bycicles">
          <Route path=":type" element={<Category />} />
        </Route>
        <Route path="product/options">
          <Route path=":id" element={<ProductView />} />
        </Route>
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
};