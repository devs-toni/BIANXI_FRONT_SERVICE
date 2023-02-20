import { Route, Routes } from "react-router-dom";
import Page404 from "../components/User/Page404";
import Home from "../components/Layouts/Home/Home";
import Category from "../components/Layouts/Categories/Category";

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
}