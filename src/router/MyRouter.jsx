import { Route, Routes } from "react-router-dom";
import { Category, ProductView, Home, PaymentPage, Orders } from "../components/index";
import React from 'react';
import { useLanguage } from "../context/GlobalContext";

export const MyRouter = () => {

  const { text } = useLanguage();

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="product-category/bycicles">
          <Route path=":type" element={<Category category="category" container="products" box="product-box" />} />
          <Route path="search">
            <Route path=":search" element={<Category category="search-category" container="search-products" box="search-product-box" />} />
          </Route>
          <Route path="favourites" element={<Category category="likes-category" container="like-products" box="like-product-box" title={text.likes.title} />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="product/options">
          <Route path=":type/:id" element={<ProductView />} />
        </Route>
        <Route path="shopping-cart" element={<PaymentPage />} />
      </Route>
      <Route path='*' />
    </Routes>
  );
};