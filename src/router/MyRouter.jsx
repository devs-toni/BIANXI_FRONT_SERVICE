import { Route, Routes } from "react-router-dom";
import Page404 from "../components/User/Page404";
import Category from "../components/Layouts/Categories/Category";
import Home from "../components/Layouts/Home/Home";
import LanguageContext from '../context/LanguageContext';
import { useContext, useState } from "react";

export const MyRouter = () => {

  const initProducts = [
    {
      name: "Aquila CV TT Ultegra",
      price: 6928.00,
    }
  ];

  const { text } = useContext(LanguageContext);
  const [products, setProducts] = useState(initProducts);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-category/bycicles/road" element={<Category name={text.header.road.toLowerCase()} type='road' />} />
      <Route path="/product-category/bycicles/mtb" element={<Category name={text.header.mtb.toLowerCase()} type='mtb' />} />
      <Route path="/product-category/bycicles/ebike" element={<Category name={text.header.ebike.toLowerCase()} type='ebike' />} />
      <Route path="/product-category/bycicles/city" element={<Category name={text.header.city.toLowerCase()} type='city' />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}