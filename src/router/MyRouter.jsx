import { Route, Routes } from "react-router-dom";
import { Category, ProductView, Home, PaymentPage, Orders, UserSection } from "../components/index";
import React from 'react';
import { useLanguage } from "../context/GlobalContext";
import { CATEGORY_ROUTER, PRODUCT_ROUTER, SEARCH_ROUTER, CART_ROUTER, USER_ROUTER, FAVOURITES_ROUTER, ORDERS_ROUTER, UNDEFINED_ROUTER, HOME_ROUTER } from "./paths";

export const MyRouter = () => {

  const { text } = useLanguage();

  return (
    <Routes>
      <Route path={HOME_ROUTER}>

        <Route index element={<Home />} />
        <Route path={CATEGORY_ROUTER}>
          <Route path=":type" element={<Category category="category" container="products" box="product-box" />} />
          <Route path={PRODUCT_ROUTER}>
            <Route path=":type/:id" element={<ProductView />} />
          </Route>
          <Route path={SEARCH_ROUTER}>
            <Route
              path=":search"
              element={<Category
                category="search-category"
                container="search-products"
                box="search-product-box"
              />}
            />
          </Route>
        </Route>
        <Route path={CART_ROUTER} element={<PaymentPage />} />
        <Route path={USER_ROUTER}>
          <Route
            path={FAVOURITES_ROUTER}
            element={<UserSection
              component={Category}
              category="likes-category"
              container="like-products"
              box="like-product-box"
              title={text.likes.title}
            />}
          />
          <Route
            path={ORDERS_ROUTER}
            element={<UserSection
              component={Orders}
            />}
          />
        </Route>

      </Route>
      <Route path={UNDEFINED_ROUTER} />
    </Routes>
  );
};