import { Route, Routes } from "react-router-dom";
import Page404 from "../components/User/Page404";
import Mtb from "../components/Layouts/Categories/Mtb";
import Road from "../components/Layouts/Categories/Road";
import City from "../components/Layouts/Categories/City";
import Ebike from "../components/Layouts/Categories/Ebike";
import Home from "../components/Layouts/Home/Home";

export const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-category/bycicles/road" element={<Road />} />
      <Route path="/product-category/bycicles/mtb" element={<Mtb />} />
      <Route path="/product-category/bycicles/ebike" element={<Ebike />} />
      <Route path="/product-category/bycicles/city" element={<City />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}