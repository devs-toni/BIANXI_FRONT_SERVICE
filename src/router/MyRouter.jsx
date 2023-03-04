import { Route, Routes } from "react-router-dom";
import { Category, ProductView, Home, PrivateRoute } from "../components/index";
import React from 'react';

export const MyRouter = () => {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="product-category/bycicles">
          <Route path=":type" element={<Category />} />
          <Route path="search">
            <Route path=":name" element={<Category />} />
          </Route>
        </Route>
        <Route path="product/options">
          <Route path=":type/:id" element={<ProductView />} />
        </Route>
      </Route>
      <Route path='*' />
    </Routes>
  );
};